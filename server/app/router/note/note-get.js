// get the note detial 
const User = require("../../model/User");
const Note = require("../../model/Note");
const Like = require("../../model/Like");
const mongoose = require("mongoose");

// the request read the params and display give the content of the note
module.exports = async (req, res) => {
    // console.log('get contentMD');
    // fetch the id from the params
    const {noteId} = req.params;
    const _noteId = mongoose.Types.ObjectId(noteId);

    // get the contentMD from the database
    const note = await Note.findOne({_id: _noteId});
    if (!note) return res.status(404).send('invalid id, cannot find the note');
    
    // check if the note is my own note
    const isMine = (note.author.toString() == req.body.user_id.toString());

    // check if the note is being liked
    const findLike = await Like.findOne({user: req.body.user_id, note: _noteId});
    var liked = false;
    if (!findLike) liked = false;
    else {
        liked = true;
        console.log(findLike);
    }

    res.status(200).json({success: true, noteData: note, isMe: isMine, isLiked: liked});
}