const mongoose = require('mongoose')
const user = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
})
return mongoose.model("User", user)