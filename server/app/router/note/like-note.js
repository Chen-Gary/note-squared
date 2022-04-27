// user likes a note (he can only like once for each note)
const User = require("../../model/User");
const Note = require("../../model/Note");
const Like = require("../../model/Like");
const { updateScore } = require("../../functions/recommendation");
const mongoose = require("mongoose");

// the request body
// -mode (like / dislike)
// -noteId
module.exports = async(req, res) => {
    //console.log(req.body);
    _mode = req.body.mode;
    if (_mode === "like"){
        const _noteId = mongoose.Types.ObjectId(req.body.noteId);
        // ## like the note
        // check if the note is already be liked
        const filter = {user: req.body.user_id, note: _noteId};
        const likeHistory = await Like.findOne(filter);
        if (likeHistory) return res.status(422).json({success: false, likehistory: likeHistory});
        
        // like the note (add up the like field)
        const noteFilter = {_id: _noteId, visibility: 'public'};
        const noteUpdate = {$inc: {like: 1}};
        const likeUpdateInfo = await Note.findOneAndUpdate(noteFilter, noteUpdate);
        if (!likeUpdateInfo) return res.status(422).send(`cannot update the like field of note`);
        
        // update score
        await updateScore(_noteId);

        // add the note like relationship into the database
        const newLike = new Like({
            user: req.body.user_id,
            note: _noteId
        });
        const likeInfo = await newLike.save();
        if (!likeInfo) return res.status(422).send('cannot update like relationship');
        return res.status(200).json({success: true, likeinfo: likeInfo});

    }
    else if (_mode === "dislike"){
        //## dislike is equivalent to cancel the like
        const _noteId = mongoose.Types.ObjectId(req.body.noteId);
        // check if the like relation exists, if not, cannot cancel the like
        const dislikeFilter = {user: req.body.user_id, note: _noteId};
        const likeFound = await Like.findOne(dislikeFilter);
        if (!likeFound) return res.status(422).send(`cannot dislike for user has not liked the note`);

        // pull the user- note relation from the Like schema
        const likeDeleteFilter = {author: req.body.user_id, note: _noteId};
        const likeDeletion = await Like.findOneAndDelete(likeDeleteFilter);
        if (!likeDeletion) return res.status(422).send(`cannot delete the like relation`);

        // decrease the like count
        const likeFilter = {_id: _noteId};
        const noteUpdate = ({like: {$gte: 1}}, {$inc: {like: -1}});
        // const likeNote = await Note.findOne(likeFilter);
        // if (likeNote.like < 1) return res.status(422).send(`cannot decrease the like count`);
        const likeUpdateInfo = await Note.findOneAndUpdate(likeFilter, noteUpdate);
        if (!likeUpdateInfo) return res.status(422).send(`cannot decrease the like count`);


        // update score
        await updateScore(_noteId);
        return res.status(200).json({success: true, deletedLikeRelation: likeDeletion});
    }
    else {return res.status(400).send("invalid request")}
}