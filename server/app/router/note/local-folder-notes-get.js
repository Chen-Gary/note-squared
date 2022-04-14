// get the folder and notes info of local user
const User = require("../../model/User");
const Note = require("../../model/Note");
const Folder = require("../../model/Folder");
const {getLocalFolderNote} = require("../../functions/noteQuery");
const mongoose = require("mongoose");

// no need for parameters, only need userId, which is included in token
module.exports = async (req, res) => {
    const localInfo = await getLocalFolderNote(req.body.user_id);
    return res.status(200).json(localInfo.data);
}