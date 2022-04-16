// fork the public notes of others (basically copy it)
const Note = require("../../model/Note");
const Folder = require("../../model/Folder");
const mongoose = require("mongoose");
const { updateScore } = require("../../functions/recommendation");

// the request body to fork a note
// the forked note is by default public, the like attribute of the note will be eliminated
// -noteId: the id of the note to be forked
// -folderId: the folder to add the forked note
module.exports = async (req, res) => {
    // console.log(req.body);
    const {noteId, folderId} = req.body;
    const _noteId = mongoose.Types.ObjectId(noteId);
    const _folderId = mongoose.Types.ObjectId(folderId);
    
    // find the note to be forked
    const note2Fork = await Note.findOne({_id: _noteId, visibility: 'public', author: {$ne: req.body.user_id}});
    if (!note2Fork) return res.status(404).send(`cannot find the note, the note has to be other's public note`);

    // find the folder to which the note is to be added
    const folder2Add = await Folder.findOne({_id: _folderId, author: req.body.user_id});
    if (!folder2Add) return res.status(404).send(`cannot find the folder`);

    // copy the content of the forked folder
    const newNote = new Note({
        author: req.body.user_id,
        title: note2Fork.title,
        description: note2Fork.description,
        contentMD: note2Fork.contentMD,
        visibility: 'public'
    });
    const saveInfo = await newNote.save();
    if (!saveInfo) return res.status(422).send(`cannot add the new note`);
    const newNoteId = saveInfo._id;

    // add the note to the folder
    const filter = {_id: _folderId};
    const forkUpdate = {$push: {notes: newNoteId}};
    const updateInfo = await Folder.findOneAndUpdate(filter, forkUpdate);
    if (!updateInfo) return res.status(422).send(`cannot add the note to the folder`);

    // update the fork info of the original note
    const forkFilter = {_id: note2Fork._id};
    const increaseFork = {$inc: {fork: 1}};
    const incForkUpdate = await Note.findOneAndUpdate(forkFilter, increaseFork);
    if (!incForkUpdate) return res.status(422).send('cannot increase the fork number of the original note');

    // update score
    await updateScore(_noteId);

    return res.status(200).json({success: true, newNote: saveInfo});
}
