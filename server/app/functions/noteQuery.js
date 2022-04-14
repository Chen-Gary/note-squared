// this folder contains some functions to fetch data from the database
const User = require("../model/User");
const Note = require("../model/Note");
const Folder = require("../model/Folder");
const Like = require("../model/Like");

const mongoose = require("mongoose");

// get the folders and notes of a particular user
// the return result preserve the folder-note structure
async function getLocalFolderNote(userId) {
    const result = {
        status: false,
        queryInfo: "",
        data: []
    }
    const folderFilter = {author: userId};
    const foldersFound = await Folder.find(folderFilter).sort({title: 1});
    //console.log(foldersFound);
    for (var i=0; i<foldersFound.length; i++){
        var notesInFolder = foldersFound[i];
        //console.log(notesInFolder);
        var temp = {
            folder: foldersFound[i]._id,
            note: notesInFolder
        }
        result.data.push(temp);
    }
    return result;
}

module.exports = {
    getLocalFolderNote
}