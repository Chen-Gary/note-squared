const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema, model} = mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model

const UserScheme = new Schema({
    username: { type:String, require:true },
    password: {
        type:String,
        require:true,
        set (val){
            return bcrypt.hashSync(val, 10)
        }
    },
    name: { type:String, require:true },
    isAdmin: { type:String, default:'0' } // 1->admin, 0->normal user
})

const User = model('User', UserScheme)

module.exports = User