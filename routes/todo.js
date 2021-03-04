const router = require('express').Router()
const ejs = require('ejs');

// models
const Todo = require('../models/Todo')

// root path setup to index.ejs render
router.get('/', async function(req, res) {
    try {
        //Todo: Reterive the current user
        const todos = await Todo.find({})
        ejs.renderFile('./client/index.ejs', { todos }, null, function(err, html) {
            res.send(html)
        })
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})

// to add something to db
router.post('/addTodo', function(req, res) {
    // code haye add kardane todo be MongoDB
    // add mikone be DB
    try {
        Todo.count({}, async function(err, count) {
            const todo = await Todo.create({ text: req.body.todo, index: ++count })
            res.send({ ok: true, todo })
        });
    } catch (e) {
        res.status(400).send({ ok: false, error: e })
    }
})


// to get all todos from db
router.get('/getAllTodos', async function(req, res) {
    try {
        const todos = await Todo.find({})
        res.send({ ok: true, todos })
    } catch (e) {
        res.status(400).send({ ok: false, error: e })
    }
})


// to update something in db
router.put('/updateTodo', async function(req, res) {
    try {
        const todo = await Todo.findByIdAndUpdate(req.body.id, req.body.todo, { new: true })
        res.send({ ok: true, todo, message: 'Todo updated successfuly' })
    } catch (e) {
        res.status(400).send({ ok: false, message: 'Could not update todo!', error: e })
    }
})


// to delete sth from db
router.delete('/deleteTodo', async function(req, res) {
    try {
        await Todo.findByIdAndDelete(req.body.id)
        res.send({ ok: true, item: req.body.id, message: 'Item has successfuly deleted!' })
    } catch (e) {
        res.send({ ok: false, error: e })
    }
})

module.exports = router