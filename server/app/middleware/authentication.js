const jwt = require("jsonwebtoken");
const key = require("../config/key");
const User = require("../model/User");

function parseJwt(jwtStr) {
    const result = {
        status: false,
        _id: "",
        email: ""
    }

    try {
        const token = jwtStr.split(' ').pop()

        const jwtDecoded = jwt.verify(token, key.secret_jwt)
        result._id = jwtDecoded._id
        result.email = jwtDecoded.email
        result.status = true
    } catch {
        result.status = false
    }

    return result
}

async function isJwtValid(jwtStr) {

    const result = {
        status: false,
        statusCode: 200,
        message: "default message",
        userEntry: null
    }

    const parseResult = parseJwt(jwtStr)

    if (parseResult.status === false) {
        result.statusCode = 422
        result.message = 'invalid token'
        return result
    }

    // check if the user is in database
    const user = await User.findById(parseResult._id)
    if (!user) {
        result.statusCode = 422
        result.message = 'invalid user'
        return result
    }

    // check email
    if (parseResult.email !== user.email) {
        result.statusCode = 422
        result.message = 'invalid user'
        return result
    }

    // user exist
    result.userEntry = user
    result.status = true

    return result
}


// middleware: check if the user is admin
const isAdmin = async (req, res, next) => {

    const myJwtObj = await isJwtValid(req.headers.authorization)
    if (myJwtObj.status === false) { return res.status(myJwtObj.statusCode).send({message: myJwtObj.message}) }

    // the user exist, check authority
    const user = myJwtObj.userEntry
    if (user.role === 'normal') {
        return res.status(409).send({message: 'do not have authority of admin'})
    } else if (user.role === 'admin'){
        next()
    }
}

// middleware: normal user authentication
// `req.body._id` will be assigned and can be used in `next`, after checking user authentication
const isNormalLogin = async (req, res, next) => {

    req.body._id = ""   //reset to empty

    const myJwtObj = await isJwtValid(req.headers.authorization)
    if (myJwtObj.status === false) { return res.status(myJwtObj.statusCode).send({message: myJwtObj.message}) }

    // the user exist, write `_id` in `req`
    const user = myJwtObj.userEntry
    req.body._id = user._id
    next()
}


module.exports = {
    isAdmin,
    isNormalLogin,
}
