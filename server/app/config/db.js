const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/note_squared'

module.exports = (app) => {
    mongoose.connect(mongoUrl, {useNewUrlParser:true, useUnifiedTopology:true, autoIndex: true}, (error)=>{
        if (error) {
            console.log(error)
        } else {
            console.log('mongodb connect')
        }
    })
}
