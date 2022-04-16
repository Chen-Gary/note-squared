const mongoose = require('mongoose')
const {Schema, model} = mongoose

const NoteSchema = new Schema({

    author: { // author is user in the user schema
        type: mongoose.Schema.Types.ObjectId, // objectID unique datatype in db
        ref: 'User', // reference the user (similar to foreign key)
        required:true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    contentMD: {
        type: String,
        default: ""
    },

    visibility: {
        type: String,
        required: true,
        enum: ['private', 'public'],
        default:'public',
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        required: true,
        default: 0,
    },
    fork: {
        type: Number,
        required: true,
        default: 0
    },
    score: {
        type: Number,
        required: true,
        default: 0   
    }
})

const Note = model('Note', NoteSchema)

module.exports = Note
