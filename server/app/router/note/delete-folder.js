// note: delete the folder
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");
const {deleteOneFolder} = require("../../functions/noteDeletion");

// the request body to delete a note
// -folderId str
module.exports = async (req, res) => {
    // console.log(req.body);
    const {folderId} = req.body;
    const _folderId = mongoose.Types.ObjectId(folderId);

    // delete the folder
    const folderDeleteInfo = await deleteOneFolder(_folderId, req.body.user_id);
    if (!folderDeleteInfo) return res.status(422).send(`cannot delete folder: ${folderDeleteInfo.deletInfo}`);

    // // find all the notes under the folder
    // const foler2Delete = await Folder.findOne({_id: _folderId, author: req.body.user_id});
    // if (!foler2Delete) return res.status(404).send(`cannot find the folder`);
    // const notes2Delete = foler2Delete.notes;
    
    // // delete the notes in the folder from the db
    // const deleteFilter = {_id: {$in: notes2Delete}};
    // const deleteInfo = await Note.deleteMany(deleteFilter);
    // if (!deleteInfo) return res.status(422).send(`cannote delete notes under the folder`);

    // // delete the folder
    // const deletedFolder = await Folder.deleteOne({_id: _folderId});
    // if (!deletedFolder) return res.status(422).send(`cannote delete the folder`);

    res.status(200).send(`${folderDeleteInfo.deletInfo}`);
}