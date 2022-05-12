const jwt = require("jsonwebtoken");

const key = require("../../config/key");
const User = require("../../model/User");
const Folder = require("../../model/Folder");
const EmailVerificationBuffer = require("../../model/EmailVerificationBuffer");

async function createDefaultFolder(user_id) {
    // create folder
    const newFolder = new Folder({
        title: "default",
        author: user_id
    });
    const folderInfo = await newFolder.save();
    // return the folderId
    return folderInfo._id;
}

module.exports = async (req, res) => {

    const newUserInfo = {
        //username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: 'normal'
    }

    // // check `username`
    // const userCheck_1 = await User.findOne({username: newUserInfo.username})
    // if (userCheck_1) { return res.status(409).send('username already exists') }

    // check password complexity
    if (newUserInfo.password.length < 3 || newUserInfo.password.length > 32) {
        return res.status(409).send({message: 'password length should be between 3 and 32'})
    }

    // check if the email is already registered
    const userCheck = await User.findOne({email: newUserInfo.email})
    if (userCheck) { return res.status(409).send({message: 'email already registered'}) }

    // check if the email is verified
    const entry = await EmailVerificationBuffer.findOne({email: newUserInfo.email})
    if (entry) {
        if (entry.verificationCode === req.body.verificationCode &&
            entry.usedFor === 'register') {
            const newUser = await new User(newUserInfo).save()
            // update the default folder
            const folderId = await createDefaultFolder(newUser._id);
            await User.findOneAndUpdate({_id: newUser._id}, {defaultFolder: folderId});
            await entry.deleteOne()

            return res.status(200).send(newUser)
        } else {
            return res.status(409).send({message: 'wrong verification code'})
        }
    }
    return res.status(409).send({message: 'email not verified'})
}
