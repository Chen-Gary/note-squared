const ShortUniqueId = require('short-unique-id');
const  nodemailer = require('../../config/nodemailer.config')

const User = require("../../model/User");
const EmailVerificationBuffer = require("../../model/EmailVerificationBuffer");

const uid = new ShortUniqueId({ length: 4 });


module.exports = async (req, res) => {
    const _email = req.body.email

    //TODO: check email syntax

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
    //await nodemailer.sendConfirmationEmail(_email, _email, _verificationCode)

    res.status(200).send(newCode)
    //res.status(200).send({message: 'email verification code sent successfully'})
}
