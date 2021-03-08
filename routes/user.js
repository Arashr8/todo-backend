const router = require('express').Router()
const ejs = require('ejs');
const bcrypt = require('bcrypt')
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
            // Todo: Check if user already exists

        // Encrype password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        const user = User.create({
            email,
            password: hashPass
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
        let checkUser = await User.findOne({ "email": email })
        if (checkUser) {
            const passwordIsValid = await bcrypt.compare(password, checkUser.password)
            if (passwordIsValid) {
                // Todo: set JWT cookies
                res.cookie("user", checkUser._id)
                res.redirect('/todos')
            }
        } else {
            res.redirect('/todos')
        }
    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
})

router.get('/logout', async function(req, res) {
    try {
        res.clearCookie("user")
        res.redirect('/user/login')
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})

module.exports = router