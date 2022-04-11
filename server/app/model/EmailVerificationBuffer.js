const mongoose = require('mongoose')
const {Schema, model} = mongoose

const EmailVerificationBufferSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    usedFor: {
        type: String,
        required: true,
        enum: ['register', 'resetPwd'],
    },
    verificationCode: {
        type: String,
        required: true
    },
    sendDate: {
        type: Date,
        default: Date.now
    }
})

const EmailVerificationBuffer = model('EmailVerificationBuffer', EmailVerificationBufferSchema)

module.exports = EmailVerificationBuffer
