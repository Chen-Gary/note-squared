// note: delete the note
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");

// the request body to delete a note
// -folderId str
// -noteId str
module.exports = async (req, res) => {
    // console.log(req.body);
    // fetch request components
    const {folderId, noteId} = req.body;

    // delete the note in db
    const noteFilter = {_id: mongoose.Types.ObjectId(noteId)};
    const deletedNote = await Note.findOneAndDelete(noteFilter);
    if (!deletedNote) return res.status(422).send(`cannot delete note`);

    // remove the note from folder notes list
    const folderFilter = {_id: mongoose.Types.ObjectId(folderId)};
    const updateInfo = {$pull: {notes: mongoose.Types.ObjectId(noteId)}};
    const updateFolder = await Folder.findOneAndUpdate(folderFilter, updateInfo);
    if (!updateFolder) return res.status(422).send(`cannot update note information in folder`);

    return res.status(200).send(`successfully deleted ${deletedNote}`);
}