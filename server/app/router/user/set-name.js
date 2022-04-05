const User = require("../../model/User");

module.exports = async (req, res) => {
    //const user = await User.findOne({_id: req.body._id});
    await User.updateOne({_id: req.body._id}, {name: req.body.newName});
    return res.status(200).send({
        message: 'success',
        _id: req.body._id,
        newName: req.body.newName
    });
}
