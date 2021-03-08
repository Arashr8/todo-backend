const router = require('express').Router()
const ejs = require('ejs');

// models
const Todo = require('../models/Todo')

// root path setup to index.ejs render
router.get('/', async function(req, res) {

    try {
        // Change this to get value from jwt
        const userId = req.cookies.user;
        if (!userId || userId == "") {
            res.redirect('/user/login')
        } else {
            res.redirect('/todos/')
        }
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e, login: false }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})

module.exports = router