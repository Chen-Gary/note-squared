const User = require("../../model/User");

// the following attributes are not returned
const usersProjection = {
    password: false,
    __v: false,
}

module.exports = async (req, res) => {
    const list = await User.find({}, usersProjection)
    res.status(200).send(list)
}
