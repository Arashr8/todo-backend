window.onload = function() {
    addEventListeners()
}

function addEventListeners() {
    const registerbtn = document.getElementById("registerBtn")
    if (registerbtn) {
        registerbtn.addEventListener("click", registerUser)
    }
    const loginbtn = document.getElementById("loginBtn")
    if (loginbtn) {
        loginbtn.addEventListener("click", loginUser)
    }
}

function isValidForm() {
    const password = document.getElementById("user-password")
    const confirmed_password = document.getElementById("user-confirmed-password")
    const error_placeholder = document.getElementById("errors")

    //Validate email address
    const email = document.getElementById("user-email")
    if (email.value == "") {
        error_placeholder.innerHTML = "Please insert your email address"
        return false
    }

    if (password.value != confirmed_password.value) {
        error_placeholder.innerHTML = "Passwords is not matched"
        return false
    }

    return true
}

async function registerUser(event) {
    if (isValidForm()) {
        const password = document.getElementById("user-password")
        const confirmed_password = document.getElementById("user-confirmed-password")
        const email = document.getElementById("user-email")
        const error_placeholder = document.getElementById("errors")
        const info_placeholder = document.getElementById("info")

        const response = await fetch('/user/register', {
            method: 'post',
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                confirmedPassword: confirmed_password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        error_placeholder.innerHTML = ""
        info_placeholder.innerHTML = ""
        if (!result.success) {
            error_placeholder.innerHTML = result.message
        } else {
            info_placeholder.innerHTML = result.message
        }
    }
}

async function loginUser() {
    const email_element = document.getElementById("user-email")
    const password_element = document.getElementById("user-password")
    const error_placeholder = document.getElementById("errors")
    const response = await fetch('/user/login', {
        method: 'post',
        body: JSON.stringify({
            email: email_element.value,
            password: password_element.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    error_placeholder.innerHTML = ""
    if (!result.success) {
        error_placeholder.innerHTML = result.message
    } else {
        window.location.replace("/todos")
    }
}