const router = require('express').Router()
const ejs = require('ejs');
const User = require('../models/User')

router.get('/user/register', async function(req, res) {
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
router.post('/user/register', async function(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = User.create({
            email,
            password
        })


        ejs.renderFile('./client/user/register.ejs', { messsage: "User has been created successfully" }, null, function(err, html) {
            res.send(html)
        })
    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
})

module.exports = router