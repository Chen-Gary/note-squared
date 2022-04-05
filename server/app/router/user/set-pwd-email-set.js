const User = require("../../model/User");
const EmailVerificationBuffer = require("../../model/EmailVerificationBuffer");

module.exports = async (req, res) => {
    const { email, newPwd, verificationCode } = req.body;

    // check if the email has been registered
    const user = await User.findOne({email: email})
    if (!user) { return res.status(409).send({message: 'email never registered'}) }

    // check if the email is verified
    const entry = await EmailVerificationBuffer.findOne({email: email})

    if (entry) {
        if (entry.verificationCode === verificationCode &&
            entry.usedFor === 'resetPwd') {
            await User.updateOne({_id: user._id}, {password: newPwd});
            await entry.deleteOne()

            return res.status(200).send({message: 'success'})
        } else {
            return res.status(409).send({message: 'wrong verification code'})
        }
    }
    return res.status(409).send({message: 'email not verified'})
}
