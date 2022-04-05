const User = require("../../model/User");


module.exports = async (req, res) => {
    // get inputs
    const {_id, newPwd} = req.body;

    await User.updateOne({_id: _id}, {
        password: newPwd
    });

    return res.status(200).send({message: 'success'});
}
