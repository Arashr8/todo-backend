const router = require('express').Router()
const ejs = require('ejs');
const path = require('path')
const User = require('../models/User')



router.get('/register', async function(req, res) {
    try {
        ejs.renderFile('./client/user/register.ejs', {}, null, function(err, html) {
            res.send(html)
        })
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})
router.post('/register', async function(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = User.create({
            email,
            password
        })

        res.redirect('/todos?loging=true')
    } catch (e) {

        console.log(e);
        res.json({ error: e })
        res.redirect('/register')
    }
})

router.get('/login', async function(req, res) {
    try {
        ejs.renderFile('./client/user/login.ejs', {}, null, function(err, html) {
            res.send(html)
        })
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})
router.post('/login', async function(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        let checkUser = await User.findOne({ "email": email, "password": password })

        if (checkUser) {
            res.cookie("user", checkUser._id)
            res.redirect('/todos')
        } else {
            res.redirect('/todos')
        }
    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
})

module.exports = router