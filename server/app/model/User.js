const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema, model} = mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model

const UserScheme = new Schema({
    //username: { type:String, require:true },  //removed
    email: {
        type:String,
        unique: true,
        required:true
    },
    password: {
        type:String,
        required:true,
        set (val){
            return bcrypt.hashSync(val, 10)
        }
    },
    name: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
        enum: ['admin', 'normal'],
        default:'normal'
    },
    avatar: {
        type: String,
        default: null
    }

    // for email verification (removed)
    // status: {
    //     type: String,
    //     enum: ['Pending', 'Active'],
    //     default: 'Pending'
    // },
    // confirmationCode: {
    //     type: String,
    //     unique: true
    // },
})

const User = model('User', UserScheme)

module.exports = User
