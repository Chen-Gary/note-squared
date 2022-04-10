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

    // if no authentication token is sent
    if (!jwtStr) {
        result.statusCode = 403
        result.message = 'no token received'
        return result
    }

    const parseResult = parseJwt(jwtStr)

    // parse error
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
        return res.status(403).send({message: 'request rejected since admin permission required'})
    } else if (user.role === 'admin'){
        next()
    } else {
        return res.status(403).send({message: `request rejected, invalid user.role = ${user.role}`})
    }
}

// middleware: normal user authentication
// `req.body.user_id` will be assigned and can be used in `next`, after checking user authentication
const isNormalLogin = async (req, res, next) => {

    req.body.user_id = ""   //init to empty

    const myJwtObj = await isJwtValid(req.headers.authorization)
    if (myJwtObj.status === false) { return res.status(myJwtObj.statusCode).send({message: myJwtObj.message}) }

    // the user exist, write `user_id` in `req`
    const user = myJwtObj.userEntry
    req.body.user_id = user._id
    next()
}


module.exports = {
    isAdmin,
    isNormalLogin,
}
