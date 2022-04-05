const UserRouter = require('./user')
const AdminRouter = require('./admin')

module.exports = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/admin', AdminRouter)
}
