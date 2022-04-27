const mongoose = require('mongoose')
// User
const DocumentsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: Buffer
    },
    license: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'licenses'
    },
    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('documents', DocumentsSchema);