const jwt = require("jsonwebtoken");
const key = require("../config/key");
const User = require("../model/User");


// middleware: check if the user is admin
const isAdmin = async (req, res, next) => {
    //jwt-token
    let _id = ""
    let email = ""

    try {
        const token = req.headers.authorization.split(' ').pop()

        const jwtDecoded = jwt.verify(token, key.secret)
        _id = jwtDecoded._id
        email = jwtDecoded.email
    } catch {
        return res.status(422).send({message: 'invalid token'})
    }

    // check if the user is in database
    const user = await User.findById(_id)
    if (!user) { return res.status(422).send({message: 'invalid user'}) }

    // check email
    if (email !== user.email) {
        return res.status(422).send({message: 'invalid user'})
    } else {
        // the user exist, check authority
        if (user.role === 'admin') {
            return res.status(409).send({message: 'do not have authority of admin'})
        } else if (user.role === 'normal'){
            next()
        }
    }
}

module.exports = {
    isAdmin,
}
