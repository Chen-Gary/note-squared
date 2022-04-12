// folder: create or delte or edit information
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");

// the request body to modify a folder
// -mode str (new, edit)
// -title
// -description
// -folderId
module.exports = async(req, res) => {
    console.log(req.body);
    // fetch request components
    const {mode, user_id} = req.body;
    // // check the author
    // const userCheck = await User.findOne({_id: user_id});
    // if (!userCheck) {return res.status(404).send({message: 'user not found'});}

    // ####CREATE####
    if (mode === "new") {
        const {title, description} = req.body;
        // ## create new folder
        const newFolder = new Folder({
            title: title,
            description: description,
            author: user_id
        });
        const updateFolder = await newFolder.save();
        if (!updateFolder) res.status(422).send(`cannot update folder information`);
        return res.status(200).send(newFolder._id);
    }
    // ####EDIT####
    else if (mode === "edit") {
        const {title, description, folderId} = req.body;

        // find the folder
        const note2Update = await Folder.findOne({_id: mongoose.Types.ObjectId(folderId)});
        if (!note2Update) return res.status(404).send("cannot find the folder by id");

        // update the note in db
        const filter = {_id: mongoose.Types.ObjectId(folderId)};
        const folderUpdate = {title: title, description:description};
        const updateInfo = await Note.findOneAndUpdate(
            filter, folderUpdate
        );
        if (!updateInfo) {res.status(422).send(`cannot update the note in db`);}
        return res.status(200).send(`edit successfully: ${folderId}`);
    }
    else {
        res.status(400).send(`incorrect request`);
    }
}