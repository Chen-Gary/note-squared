// note: move the note from its original place to another folder
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");

// the request body:
// -oldFolderId
// -newFolderId
// -noteId
module.exports = async (req, res) => {
    console.log(req.body);
    const {oldFolderId, newFolderId, noteId} = req.body;
    const _oldFolderId = mongoose.Types.ObjectId(oldFolderId);
    const _newFolderId = mongoose.Types.ObjectId(newFolderId);
    const _noteId = mongoose.Types.ObjectId(noteId);
    // check if the request is valid
    // find the note
    const note2Move = await Note.findOne({_id: _noteId, author: req.body.user_id});
    if (!note2Move) return res.status(404).send(`cannot find the note file`);
    // find the folder
    const startFolder = await Folder.findOne({_id: _oldFolderId, author: req.body.user_id});
    if (!startFolder) return res.status(404).send(`cannot find the old folder`);
    const destFolder = await Folder.findOne({_id: _newFolderId, author: req.body.user_id});
    if (!destFolder) return res.status(404).send(`cannot find the new folder`);
    // check if the note is in older folder and in the new folder
    const noteInOldFolder = startFolder.notes;
    if (!noteInOldFolder.includes(noteId)) {
        console.log(startFolder.notes);
        return res.status(422).send(`cannot move for the note is not in old folder`);
    }
    const noteInNewFolder = destFolder.notes;
    if (noteInNewFolder.includes(noteId)) {
        console.log(destFolder.notes);
        return res.status(422).send(`cannot move for it is already in the new folder`);
    }

    // move the folder: pull from old folder, push to new folder
    const pullFilter = {_id: _oldFolderId};
    const pullUpdate = {$pull: {notes: _noteId}};
    const updateOldFolder = await Folder.findOneAndUpdate(pullFilter, pullUpdate);
    if (!updateOldFolder) return res.status(422).send(`cannot pull the note from the older folder`);

    const pushFilter = {_id: _newFolderId};
    const pushUpdate = {$push: {notes: _noteId}};
    const updateNewFolder = await Folder.findOneAndUpdate(pushFilter, pushUpdate);
    if (!updateNewFolder) return res.status(422).send(`cannot push the note to the new folder`);
    return res.status(200).send(`successfully move the note: ${noteId}`);
} 