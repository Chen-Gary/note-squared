// get the note detial 
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");

// the request read the params and display give the content of the note
module.exports = async (req, res) => {
    console.log('get contentMD');
    // fetch the id from the params
    const {noteId} = req.params;
    const _noteId = mongoose.Types.ObjectId(noteId);

    // get the contentMD from the database
    const note = await Note.findOne({_id: _noteId, author: req.body.user_id});
    if (!note) return res.status(404).send('invalid id, cannot find the note');
    res.status(200).json({success: true, noteData: note});
}