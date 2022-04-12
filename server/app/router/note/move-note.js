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
    // console.log(req.body);
    const {oldFolderId, newFolderId, noteId} = req.body;
    
    // check if the request is valid
    // find the note
    const note2Move = await Note.findById(mongoose.Types.ObjectId(noteId));
    if (!note2Move) res.status(404).send(`cannot find the note file`);
    // find the folder
    const startFolder = await Folder.findById(mongoose.Types.ObjectId(oldFolderId));
    if (!startFolder) res.status(404).send(`cannot find the old folder`);
    const destFolder = await Folder.findById(mongoose.Types.ObjectId(newFolderId));
    if (!destFolder) res.status(404).send(`cannot find the new folder`);
    // check if the note is in older folder
    const noteFoundOldFolder = await Folder.find({notes: mongoose.Types.ObjectId(noteId)});
    if (noteFoundOldFolder === []) {res.status(404).send(`note is not in the folder`);}

    // move the folder: pull from old folder, push to new folder
    const pullFilter = {_id: mongoose.Types.ObjectId(oldFolderId)};
    const pullUpdate = {$pull: {notes: mongoose.Types.ObjectId(noteId)}};
    const updateOldFolder = await Folder.findOneAndUpdate(pullFilter, pullUpdate);
    if (!updateOldFolder) res.status(422).send(`cannot pull the note from the older folder`);

    const pushFilter = {_id: mongoose.Types.ObjectId(newFolderId)};
    const pushUpdate = {$push: {notes: mongoose.Types.ObjectId(noteId)}};
    const updateNewFolder = await Folder.findOneAndUpdate(pushFilter, pushUpdate);
    if (updateNewFolder) res.status(422).send(`cannot push the note from the older folder`);
} 