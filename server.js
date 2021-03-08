require('dotenv').config({ path: './config/.env' })
const express = require('express')
const cookieParser = require('cookie-parser')

// db 
require('./db')

// routes
const todoRoute = require('./routes/todo')
const authRoute = require('./routes/user')
const homeRoute = require('./routes/home')

const app = express()
const staticFolder = express.static('client')

app.use(staticFolder)

// json body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// routes use
app.use('/todos', todoRoute)
app.use('/user', authRoute)
app.use(homeRoute)

/**
 * it starts the server on port 80
 */
app.listen(8080, () => {
    console.log('Started listening on 8080')
})