// this is a model to describe the like relationship
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const LikeSchma = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    note: {
        type: mongoose.Types.ObjectId,
        ref: 'Note',
        required: true
    }
});

// set compound index
LikeSchma.index({user: 1, note: 1}, {unique: true});

const Like = model('Like', LikeSchma);

module.exports = Like;