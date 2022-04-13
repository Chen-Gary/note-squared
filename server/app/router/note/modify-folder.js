// folder: create or delte or edit information
const User = require("../../model/User");
const Note = require("../../model/Note");
const mongoose = require("mongoose");
const Folder = require("../../model/Folder");

// the request body to modify a folder
// -mode (new, edit)
// -title
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
            author: user_id
        });
        const updateFolder = await newFolder.save();
        if (!updateFolder) return res.status(422).send(`cannot update folder information`);
        return res.status(200).json({success: true, data: updateFolder});
    }
    // ####EDIT####
    else if (mode === "edit") {
        const _folderId = mongoose.Types.ObjectId(req.body.folderId);
        // find the folder
        const note2Update = await Folder.findOne({_id: _folderId, author: req.body.user_id});
        if (!note2Update) return res.status(404).send("cannot find the folder by id");

        // update the folder in db
        var _title = note2Update.title;
        if (req.body.title !== null && req.body.title !== "") _title = req.body.title;
        
        const filter = {_id: _folderId};
        const folderUpdate = {title: _title};
        const updateInfo = await Folder.findOneAndUpdate(
            filter, folderUpdate
        );
        if (!updateInfo) {return res.status(422).send(`cannot update the note in db`);}
        return res.status(200).send(`edit successfully: ${_folderId}`);
    }
    else {
        return res.status(400).send(`incorrect request`);
    }
}