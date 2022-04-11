const User = require("../../model/User");

module.exports = async (req, res) => {
    //const user = await User.findOne({_id: req.body._id});
    await User.updateOne({_id: req.body.user_id}, {name: req.body.newName});
    return res.status(200).send({
        message: 'success',
        user_id: req.body.user_id,
        newName: req.body.newName
    });
}
