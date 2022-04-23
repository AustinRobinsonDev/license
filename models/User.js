const mongoose = require('mongoose')
// User
const UserSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
    },
    profile: {
        type: String,
    },
    billingAddr: {
        type: String,
        required: true
    },
    mailingAddr: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('user', UserSchema);