require('dotenv').config({ path: './config/.env' })
const express = require('express')

// db 
require('./db')

// routes
const todoRoute = require('./routes/todo')

const app = express()
const staticFolder = express.static('client')

app.use(staticFolder)

// json body parser
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// routes use
app.use(todoRoute)


/**
 * it starts the server on port 80
 */
app.listen(80, () => {
    console.log('Started listening on 80')
})