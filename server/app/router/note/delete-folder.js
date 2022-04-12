// note: delete the folder
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");

// the request body to delete a note
// -folderId str
module.exports = async (req, res) => {
    // console.log(req.body);
    const {folderId} = req.body;
    const _folderId = mongoose.Types.ObjectId(folderId);

    // find all the notes under the folder
    const foler2Delete = await Folder.findById(_folderId);
    if (!foler2Delete) res.status(404).send(`cannot find the folder`);
    const notes2Delete = foler2Delete.notes;
    
    // delete the notes in the folder from the db
    const deleteFilter = {_id: {$in: notes2Delete}};
    const deleteInfo = await Note.deleteMany(deleteFilter);
    if (!deleteInfo) res.status(422).send(`cannote delete notes under the folder`);

    // delete the folder
    const deletedFolder = await Folder.deleteOne({_id: _folderId});
    if (!deletedFolder) res.status(422).send(`cannote delete the folder`);

    res.status(200).send(`successfully deleted`);
}