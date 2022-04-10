const User = require("../../model/User");

// the following attributes are not returned
const usersProjection = {
    password: false,
    __v: false,
}

module.exports = async (req, res) => {
    const user = await User.findOne({_id: req.body.user_id}, usersProjection)
    return res.status(200).send(user)
}
