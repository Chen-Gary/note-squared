// get the folder and notes info of local user
const {getLocalFolderNote} = require("../../functions/noteQuery");

// no need for parameters, only need userId, which is included in token
// parameter: withNote
module.exports = async (req, res) => {
    const {withNote} = req.body;
    const localInfo = await getLocalFolderNote(req.body.user_id, withNote);
    if (!localInfo.status) return res.status(404).send(`cannot find user folders ${localInfo.queryInfo}`);

    return res.status(200).json({success: true, data: localInfo.data});
}