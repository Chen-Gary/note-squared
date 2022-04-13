// note: delete the note
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");
const {deleteOneNote} = require("../../functions/noteDeletion");

// the request body to delete a note
// -folderId str
// -noteId str
module.exports = async (req, res) => {
    // console.log(req.body);
    const { folderId, noteId } = req.body;
    // fetch request components
    const _folderId = mongoose.Types.ObjectId(folderId);
    const _noteId = mongoose.Types.ObjectId(noteId);

    const deleteInfo = await deleteOneNote(_noteId, _folderId, req.body.user_id);
    if (!deleteInfo.status) return res.status(422).send(`delete failed: ${deleteInfo.deleteInfo}`);

    // // delete the note in db
    // const noteFilter = {_id: _noteId};
    // const deletedNote = await Note.findOneAndDelete(noteFilter);
    // if (!deletedNote) return res.status(422).send(`cannot delete note`);

    // // remove the note from folder notes list
    // const folderFilter = {_id: _folderId};
    // const updateInfo = {$pull: {notes: _noteId}};
    // const updateFolder = await Folder.findOneAndUpdate(folderFilter, updateInfo);
    // if (!updateFolder) return res.status(422).send(`cannot update note information in folder`);

    return res.status(200).send(`successfully deleted: ${deleteInfo.deleteInfo}`);
}