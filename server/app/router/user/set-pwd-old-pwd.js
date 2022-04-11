const bcrypt = require('bcryptjs');

const User = require("../../model/User");


module.exports = async (req, res) => {
    const {oldPwd, newPwd} = req.body;
    const user = await User.findOne({_id: req.body.user_id});
    const isValid = await bcrypt.compare(oldPwd, user.password);

    if (isValid) {
        await User.updateOne({_id: req.body.user_id}, {password: newPwd});
        return res.status(200).send({message: 'success'});
    } else {
        return res.status(422).send({message: 'wrong old password'});
    }
}
