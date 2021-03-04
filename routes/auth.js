const router = require('express').Router()
const ejs = require('ejs');
const User = require('../models/User')

router.get('/auth/register', async function(req, res) {
    try {
        ejs.renderFile('./client/Auth/register.ejs', {}, null, function(err, html) {
            res.send(html)
        })
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})
router.post('/auth/register', async function(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = new User({
            email,
            password
        })
        const saveUser = await user.save()

        res.json({ message: "User inserted successfully", succes: ture })
    } catch (e) {
        ejs.renderFile('./client/index.ejs', { error: e }, null, function(err, html) {
            res.status(400).send(html)
        })
    }
})

module.exports = router