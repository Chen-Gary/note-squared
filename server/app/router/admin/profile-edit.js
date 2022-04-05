const User = require("../../model/User");


module.exports = async (req, res) => {
    // get inputs
    const {_id, email, name, role} = req.body;

    await User.updateOne({_id: _id}, {
        email: email,
        name: name,
        role: role
    });

    const user = await User.findOne({_id: _id});
    return res.status(200).send(user);
}
