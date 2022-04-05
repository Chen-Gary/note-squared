const jwt = require("jsonwebtoken");

const key = require("../../config/key");
const User = require("../../model/User");
const EmailVerificationBuffer = require("../../model/EmailVerificationBuffer");


module.exports = async (req, res) => {

    const newUserInfo = {
        //username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: 'normal',
    }

    // // check `username`
    // const userCheck_1 = await User.findOne({username: newUserInfo.username})
    // if (userCheck_1) { return res.status(409).send('username already exists') }

    // check if the email is already registered
    const userCheck = await User.findOne({email: newUserInfo.email})
    if (userCheck) { return res.status(409).send({message: 'email already registered'}) }

    // check if the email is verified
    const entry = await EmailVerificationBuffer.findOne({email: newUserInfo.email})
    if (entry) {
        if (entry.verificationCode === req.body.verificationCode) {
            const newUser = await new User(newUserInfo).save()
            await entry.deleteOne()

            return res.status(200).send(newUser)
        } else {
            return res.status(409).send({message: 'wrong verification code'})
        }
    }
    return res.status(409).send({message: 'email not verified'})
}
