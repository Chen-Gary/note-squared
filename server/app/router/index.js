const UserRouter = require('./user');
const AdminRouter = require('./admin');
const NoteRouter = require('./note');

module.exports = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/admin', AdminRouter);
    app.use('/api/note', NoteRouter);

    // catch 404 (no API matched)
    app.use((req, res, next)=>{
        // next(createError(404));
        res.status(404).send({message: 'no API matched'});
    });
}
