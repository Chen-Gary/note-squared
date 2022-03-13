const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/note2_user_table'

module.exports = app => {
    mongoose.connect(mongoUrl, {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
        console.log('mongodb connect')
    })
}
