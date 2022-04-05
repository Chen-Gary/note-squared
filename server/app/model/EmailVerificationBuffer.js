const mongoose = require('mongoose')
const {Schema, model} = mongoose

const EmailVerificationBufferSchema = new Schema({
    email: {
        type:String,
        unique: true,
        require:true
    },
    usedFor: {
        type:String,
        require:true,
        enum: ['register', 'resetPwd'],
    },
    verificationCode: {
        type:String,
        require:true
    },
    sendDate: {
        type: Date,
        default: Date.now
    }
})

const EmailVerificationBuffer = model('EmailVerificationBuffer', EmailVerificationBufferSchema)

module.exports = EmailVerificationBuffer
