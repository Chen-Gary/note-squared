const UserRouter = require('./user')

module.exports = app => {
    app.use('/user', UserRouter)
}