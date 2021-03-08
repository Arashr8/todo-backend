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
        const currentUser = await User.findOne({ email })
        if (currentUser) {
            res.send({ success: false, message: `Email ${email} already exists. Pleas try to login` })
        }

        // Encrype password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        const user = User.create({
            email,
            password: hashPass
        })

        res.send({ success: true, message: "User has been created successfully. You can login <a href='/user/login'>here</a>" })
    } catch (e) {

        console.log(e);
        res.send({ success: false, message: e })
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
            console.log(passwordIsValid);
            if (passwordIsValid) {
                // Todo: set JWT cookies
                res.cookie("user", checkUser._id)
                res.redirect('/todos')
            }
        }
        ejs.renderFile('./client/user/login.ejs', { message: "Username or Password is incorrect" }, null, function(err, html) {
            res.send(html)
        })
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