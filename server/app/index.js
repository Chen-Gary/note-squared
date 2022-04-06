const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const mongo = require('./config/db')
const routes = require('./router')

const PORT = 3000
const app = new express()

mongo(app)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// print request info from front-end to console
// (comment this out if you do not want to see the log)
app.use(morgan('dev'))

routes(app)

app.listen(PORT, ()=>{
    console.log(`server listen at ${PORT}`)
})
