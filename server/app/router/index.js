const UserRouter = require('./user')

module.exports = (app) => {
    app.use('/api/user', UserRouter)
}
