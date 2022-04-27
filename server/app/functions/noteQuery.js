// this folder contains some functions to fetch data from the database
const User = require("../model/User");
const Note = require("../model/Note");
const Folder = require("../model/Folder");
const Like = require("../model/Like");

const mongoose = require("mongoose");

// get the folders and notes of a particular user
// the return result preserve the folder-note structure
async function getLocalFolderNote(userId, withNote) {
    const result = {
        status: false,
        queryInfo: "",
        data: []
    }
    const folderFilter = {author: userId};
    const foldersFound = await Folder.find(folderFilter).sort({publishDate: 1});
    console.log(foldersFound);
    for (var i=0; i<foldersFound.length; i++){
        var notesInFolder = foldersFound[i].notes;
        if (withNote === "true") {
            var notedInfo = [];
            for (var j=0; j<notesInFolder.length; j++){
                const note_j = await Note.findById(notesInFolder[j]);
                var tempNote = {
                    note_id: note_j._id,
                    note_title: note_j.title,
                    note_description: note_j.description,
                    note_visibility: note_j.visibility,
                    note_like: note_j.like,
                    note_fork: note_j.fork
                }
                notedInfo.push(tempNote);
            }
            //console.log(notesInFolder);
            var temp = {
                folder_id: foldersFound[i]._id,
                folder_title: foldersFound[i].title,
                note: notedInfo
            }
            result.data.push(temp);
        }
        else {
            //console.log(notesInFolder);
            var temp = {
                folder_id: foldersFound[i]._id,
                folder_title: foldersFound[i].title
            }
            result.data.push(temp);
        }
    }
    result.status = true;
    result.queryInfo = "successfully get the folders";
    return result;
}

module.exports = {
    getLocalFolderNote
}