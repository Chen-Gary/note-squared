// note: create or delete or edit note information
// const formidable = require('formidable');
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");

// the request body to modify a note:
// -mode str (new, edit)
// -folderId str
// -noteId str
// -title str
// -description str 
// -contentMD str
// -visbility str
module.exports = async (req, res) => {
    // console.log(req.body);
    // fetch request components
    const {mode, user_id} = req.body;
    // // check the author
    // const userCheck = await User.findOne({_id: user_id});
    // if (!userCheck) {return res.status(404).send({message: 'user not found'});}

    if (mode === "new"){ // ####CREATE####
        const {folderId, title, description, contentMD, visibility} = req.body;
        // ## create new note when the mode is "new"
        // check folder
        const folder = await Folder.findById(mongoose.Types.ObjectId(folderId));
        if (!folder) return res.status(404).send(`cannot find the folder`);
        
        // add the note into the Note schema
        const newNote = new Note({
            author: user_id,
            title: title,
            description: description,
            contentMD: contentMD,
            visibility: visibility
        });
        const saveInfo = await newNote.save();

        if (!saveInfo) { return res.status(422).send(`cannot create note`);}
        const noteId = saveInfo._id;
               
        // ## update the folder [notes] attribute in db
        // update the notes attribute in the folder
        // check if the note is already in the db
        const notesUnderFolder = folder.notes;
        if (notesUnderFolder.includes(noteId)) { // not very elegant here
            console.log(notesUnderFolder);
            return res.status(422).send('cannot update for duplicated note')};
        
        // add the note into the folder db
        // console.log(`the note id to be pushed is:  ${noteId}`)
        const filter = {_id: mongoose.Types.ObjectId(folderId)};
        const noteUpdate = { $push: {notes: noteId} };
        const updateInfo = await Folder.findOneAndUpdate(
            filter, noteUpdate
        );
        if (!updateInfo) {return res.status(422).send(`cannot update the notes information in folder schema`);}
        
        return res.status(200).json({success: true, data: saveInfo});
    }
    else if (mode === "edit"){ // ####EDIT####
        console.log(req.body);
        // set values
        const _noteId = mongoose.Types.ObjectId(req.body.noteId);
        // find the note
        const note2Update = await Note.findOne({_id: _noteId});
        if (!note2Update) return res.status(404).send("cannot find the note by id");
        // set the values
        var _title = note2Update.title;
        if (req.body.title !== null && req.body.title !== "") _title = req.body.title;
        var _description = note2Update.description;
        if (req.body.description !== null && req.body.description !== "") _description = req.body.description;
        var _contentMD = note2Update.contentMD;
        if (req.body.contentMD !== null && req.body.contentMD !== "") _contentMD = req.body.contentMD;
        var _visibility = note2Update.visibility;
        if (req.body.visibility !== null && req.body.visibility !== "") _visibility = req.body.visibility;
        console.log(_visibility);
        
        // update the note in db
        const filter = {_id: _noteId};
        const noteUpdate = {title: _title, description: _description, contentMD: _contentMD, visibility: _visibility};
        const updateInfo = await Note.findOneAndUpdate(
            filter, noteUpdate
        );
        if (!updateInfo) {return res.status(422).send(`cannot update the note in db`);}
        return res.status(200).send(`edit successfully: ${updateInfo}`);
    }
    else {
        return res.status(400).send(`incorrect request`);
    }
}