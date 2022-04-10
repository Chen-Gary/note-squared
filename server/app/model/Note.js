const mongoose = require('mongoose')
const {Schema, model} = mongoose

const NoteScheme = new Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },

    title: {
        type: String,
        require:true
    },
    description: {
        type: String,
        default: ""
    },
    contentMd: {
        type: String,
        default: ""
    },

    visibility: {
        type: String,
        require: true,
        enum: ['private', 'public'],
        default:'public',
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        require: true,
        default: 0,
    }
})

const Note = model('Note', NoteScheme)

module.exports = Note
