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
        // add the note into the Note schema
        const newNote = new Note({
            author: user_id,
            title: title,
            description: description,
            contentMD: contentMD,
            visibility: visibility
        });
        const saveInfo = await newNote.save();

        if (!saveInfo) {res.status(422).send(`cannot create note`);}
        const noteId = saveInfo._id;
               
        // ## update the folder [notes] attribute in db
        // update the notes attribute in the folder
        // check if the note is already in the db
        const noteFound = await Folder.find({notes: noteId});
        if (noteFound === []) { // not very elegant here
            // console.log(noteFound);
            return res.status(422).send('cannot update for duplicated note')};
        
        // add the note into the folder db
        // console.log(`the note id to be pushed is:  ${noteId}`)
        const filter = {_id: mongoose.Types.ObjectId(folderId)};
        const noteUpdate = { $push: {notes: noteId} };
        const updateInfo = await Folder.findOneAndUpdate(
            filter, noteUpdate
        );
        if (!updateInfo) {res.status(422).send(`cannot update the notes information in folder schema`);}
        
        return res.status(200).send(`create successfully: ${saveInfo}`);
    }
    else if (mode === "edit"){ // ####EDIT####
        const {noteId, title, description, contentMD, visibility} = req.body;

        // find the note
        const note2Update = await Note.findOne({_id: mongoose.Types.ObjectId(noteId)});
        if (!note2Update) return res.status(404).send("cannot find the note by id");

        // update the note in db
        const filter = {_id: mongoose.Types.ObjectId(noteId)};
        const noteUpdate = {title: title, description:description, contentMD: contentMD, visibility: visibility};
        const updateInfo = await Note.findOneAndUpdate(
            filter, noteUpdate
        );
        if (!updateInfo) {res.status(422).send(`cannot update the note in db`);}
        return res.status(200).send(`edit successfully: ${noteUpdate}`);
    }
    else {
        res.status(400).send(`incorrect request`);
    }
}