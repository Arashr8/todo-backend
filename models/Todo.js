const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text: String,
    done: { type: Boolean, default: false },
    index: { type: Number, default: 0 },
    user_id: String
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo