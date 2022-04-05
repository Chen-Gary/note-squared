const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/User");
const key = require("../../config/key");


module.exports = async (req, res)=>{
    // check if the user exist
    const user = await User.findOne({email: req.body.email})
    if (!user) { return res.status(422).send({message: 'user do not exist'}) }

    // check password
    let isPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!isPassword) { return res.status(422).send({message: 'wrong password'}) }

    // return jwt token
    const _id = user._id;
    const email = user.email;
    const token = jwt.sign({_id, email}, key.secret_jwt, {expiresIn:'24h'})
    res.status(200).send({jwt: token})
}
