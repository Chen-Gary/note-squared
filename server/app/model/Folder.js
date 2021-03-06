const mongoose = require('mongoose')
const {Schema, model} = mongoose

const FolderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    publishDate: {
        type: Date,
        default: Date.now
    }
})

const Folder = model('Folder', FolderSchema);

module.exports = Folder;