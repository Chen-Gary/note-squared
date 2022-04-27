// this file encapsulate the subroutines to delete the notes, folders, likes and comments
const User = require("../model/User");
const Note = require("../model/Note");
const Folder = require("../model/Folder");
const Like = require("../model/Like");

const mongoose = require("mongoose");

// delete the note
// id should be of objectId type
async function deleteOneNote (noteId, folderId, authorId) {
    const result = {
        status: false,
        deleteInfo: ""
    }
    
    // find if the note exists
    const noteFilter = {_id: noteId, author: authorId};
    const note2Delete = await Note.findOne(noteFilter);
    if (!note2Delete) {
        result.status = false;
        result.deleteInfo = "cannot find note";
        return result;
    }

    // delete the likes that relates to the
    const likeFilter = {note: noteId};
    const likeDeleteInfo = await Like.deleteMany(likeFilter);
    if (!likeDeleteInfo) {
        result.status = false;
        result.deleteInfo = "cannot delete likes";
        return result;
    }

    // delete noteId from the folder notes array
    const folderFilter = {_id: folderId, author: authorId};
    const folderUpdate = {$pull: {notes: noteId}};
    const folderUpdateInfo = await Folder.findOneAndUpdate(folderFilter, folderUpdate);
    if (!folderUpdateInfo) {
        result.status = false;
        result.deleteInfo = "cannot push note to folder";
        return result;
    }

    // delete the note entry
    const noteDeleteInfo = await Note.deleteOne(note2Delete);
    if (!noteDeleteInfo) {
        result.status = false;
        result.deleteInfo = "cannot delete note";
        return result;
    }
    result.status = true;
    result.deleteInfo = "successfully delete note";
    return result;
}

// delete the folder
async function deleteOneFolder(folderId, authorId){
    const result = {
        status: false,
        deletInfo: ""
    }

    // you cannot delete the default folder
    const user = await User.findById(authorId);
    if (folderId.equals(user.defaultFolder)) {
        result.status = false;
        result.deletInfo = "you cannot delete the default folder";
        return result;
    }
    // find the folder to be deleted
    const folderFilter = {_id: folderId, author: authorId};
    const folder2Delete = await Folder.findOne(folderFilter);
    if (!folder2Delete) {
        result.status = false;
        result.deletInfo = "cannot find the folder";
        return result;
    }

    // get the notes under the folder and delete them
    const notes2Delete = folder2Delete.notes;
    var arrayLength = notes2Delete.length;
    console.log(notes2Delete);
    for (var i=0; i<arrayLength; i++) {
        const noteDeleteInfo = await deleteOneNote(
            notes2Delete[i], folderId, authorId
            );
        if (!noteDeleteInfo) {
            result.status = false;
            result.deletInfo = "cannot delete the note under the file";
            return result;
        }
    }

    // delete the folder entry
    const folderDeleteInfo = await Folder.deleteOne(folder2Delete);
    if (!folderDeleteInfo) {
        result.status = "false";
        result.deletInfo = "cannot delete the folder";
        return result;
    }
    result.status = true;
    result.deletInfo = "successfully delete the folder";
    return result;
}

module.exports = {
    deleteOneNote,
    deleteOneFolder
}