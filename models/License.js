const mongoose = require('mongoose')

const LicenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: Buffer
    },
    title: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    remainingBalance: {
        type: String,
        required: true,
    },
    hasDocuments: {
        type: Boolean,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    contactFirstName: {
        type: String,
        required: true
    },
    contactLastName: {
        type: String,
        required: true
    },
    emailPrimary: {
        type: String
    },
    phonePrimary: {
        type: String
    },
    type: {
        type: String,
        default: 'Corp'
    }
})

module.exports = mongoose.model('license', LicenseSchema);