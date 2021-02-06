window.onload = function(){
	addEventListeners()
}

function handleAddItem(){
	let newItem = document.getElementById("item").value;
	if (newItem) {
		addItemTodo(newItem);
		document.getElementById("item").value = "";
	}
}

async function addItemTodo(text) {
	const result = await fetch('/addTodo', {
		method: 'post',
		body: JSON.stringify({
			todo: text
		}), 
		headers: {
			'Content-Type': 'application/json'
		} 
	})

	const data = await result.json()

	if(data.ok){
		createTodo({
			index: data.todo.index,
			_id: data.todo._id,
			text: data.todo.text,
			done: data.todo.done,
			date: data.todo.updatedAt
		})
	} else {
		console.error('Can not create todo!')
	}

	function createTodo(todo) {
		if (!todo.done) {
			let list = document.getElementById("todo");
			var str = `
				<li data-date="${new Date(todo.date).getTime()}" class="d-flex border-bottom p-3" id="${todo._id}">
					${todo.index}
					<div class="form-check">
						<label class="form-check-label todo-label">
							${todo.text}
						</label>
					</div>
					<span class="text-muted">${new Date(todo.date).toLocaleTimeString()}</span>
					<i class="remove fa fa-check ml-auto text-success" id="complete-${todo._id}"></i>
					<i class="remove fa fa-remove text-danger" style="margin-left: 10px!important;" id="remove-${todo._id}"></i>
				</li>`;
			list.insertAdjacentHTML('beforeend', str);
		}
	}
}

async function updateTodo(todoId, todoText){
	const result = await fetch('/updateTodo', {
		method: 'put',
		body: JSON.stringify({
			id: todoId,
			todo: {
				text: todoText
			}
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const data = await result.json()

	if(!data.ok){
		console.error('Could not update todo!')	
	}
}

async function incompleteItem(event){
	const iElement = event.target
	const listItem = iElement.parentNode
	const prevList = listItem.parentNode
	const todoId = iElement.id
	const todoList = document.getElementById('todo')

	const result = await fetch('/updateTodo', {
		method: 'put',
		body: JSON.stringify({
			id: todoId.replace('complete-', ''),
			todo: {
				done: false
			}
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const data = await result.json()

	if(data.ok){
		const completeIcon = listItem.querySelector('[id^="complete-"]')
		completeIcon.className = 'remove fa fa-check ml-auto text-success'
		todoList.appendChild(listItem)
	}
}


async function completeItem(event) {
	const iElement = event.target
	const listItem = iElement.parentNode
	const prevList = listItem.parentNode
	const todoId = iElement.id
	const completedList = document.getElementById('completed')

	const result = await fetch('/updateTodo', {
		method: 'put',
		body: JSON.stringify({
			id: todoId.replace('complete-', ''),
			todo: {
				done: true
			}
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const data = await result.json()

	if(data.ok){
		const completeIcon = listItem.querySelector('[id^="complete-"]')
		completeIcon.className = 'remove fa fa-undo ml-auto text-info'
		completedList.appendChild(listItem)
	}
}


async function removeItem(event) {
	const iElement = event.target
	const todoItem = iElement.id
	const liElement = iElement.parentNode
	const ulElement = liElement.parentNode

	await fetch('/deleteTodo', {
		method: 'delete',
		body: JSON.stringify({
			id: todoItem.replace('remove-', '')
		}),
		headers: {
			'Content-Type': 'application/json'
		} 
	})

	ulElement.removeChild(liElement);
}

function sortList() {
	var list, i, switching, b, shouldSwitch;
	list = document.getElementById("todo");
	switching = true;
	while (switching) {
		switching = false;
		b = list.getElementsByTagName("LI");
		for (i = 0; i < (b.length - 1); i++) {
			shouldSwitch = false;
			const aDate = +b[i].attributes['data-date'].value
			const bDate = b[i+1] ? +b[i + 1].attributes['data-date'].value : 0
			if (aDate < bDate) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			b[i].parentNode.insertBefore(b[i + 1], b[i]);
			switching = true;
		}
	}
}


function sortCompleteList() {
	var list, i, switching, b, shouldSwitch;
	list = document.getElementById("completed");
	switching = true;
	while (switching) {
		switching = false;
		b = list.getElementsByTagName("LI");
		for (i = 0; i < (b.length - 1); i++) {
			const aDate = +b[i].attributes['data-date'].value
			const bDate = b[i+1] ? +b[i + 1].attributes['data-date'].value : 0
			shouldSwitch = false;
			if (aDate < bDate) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			b[i].parentNode.insertBefore(b[i + 1], b[i]);
			switching = true;
		}
	}
}

function addEventListeners(){
	let addButton = document.querySelector("#add");
	let addInput = document.querySelector("#item");

	addButton.addEventListener("click", handleAddItem);
	addInput.addEventListener("keypress", function (e) {
		if (13 === e.keyCode) {
			handleAddItem()
		}
	});

	// assign event handlers for remove and complete items
	document.addEventListener('click', function(event){
		if(event.target.id.includes('complete-')){
			if(event.target.classList.contains('fa-check')){
				completeItem(event)
			} else {
				incompleteItem(event)
			}
		};
		if(event.target.id.includes('remove-')) removeItem(event);
	})

	document.addEventListener('dblclick', function(event){
		if(event.target.classList.contains('todo-label')){
			event.target.setAttribute('contenteditable', true)
			event.target.focus()
		}
	})

	document.addEventListener('keypress', function(event){
		if(event.target.classList.contains('todo-label') && event.which === 13){
			const liElement = event.target.closest('li')
			updateTodo(liElement.id, event.target.innerHTML.trim())
			event.target.setAttribute('contenteditable', false)
		}
	})
	
}