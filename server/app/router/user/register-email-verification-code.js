const ShortUniqueId = require('short-unique-id');
const validator = require("email-validator");
const  nodemailer = require('../../config/nodemailer.config');

const User = require("../../model/User");
const EmailVerificationBuffer = require("../../model/EmailVerificationBuffer");

const uid = new ShortUniqueId({ length: 4 });


module.exports = async (req, res) => {
    const _email = req.body.email

    // check email syntax
    if (!validator.validate(_email)) { return res.status(409).send({message: 'invalid email syntax'}) }

    // check if the email is already registered
    const userCheck = await User.findOne({email: _email})
    if (userCheck) { return res.status(409).send({message: 'email already registered'}) }

    const entry = await EmailVerificationBuffer.findOne({email: _email})
    if (entry) { await entry.deleteOne() }

    const _verificationCode = uid()
    const newCode = await new EmailVerificationBuffer({
        email: _email,
        usedFor: 'register',
        verificationCode: _verificationCode,
    }).save()

    // send verification email
    // (temporarily removed)
    //await nodemailer.sendVerificationCode_register(_email, _email, _verificationCode)

    res.status(200).send(newCode)
    //res.status(200).send({message: 'email verification code sent successfully'})
}
