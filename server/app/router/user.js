const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const key = require('../config/key')
const  nodemailer = require('../config/nodemailer.config')
const router = express.Router()


// middleware: check if the user is admin
const isAdmin = async (req, res, next)=>{
    //jwt-token
    let _id = ""
    let email = ""

    try {
        const token = req.headers.authorization.split(' ').pop()

        const jwtDecoded = jwt.verify(token, key.secret)
        _id = jwtDecoded._id
        email = jwtDecoded.email
    } catch {
        return  res.status(422).send('token不合法')
    }

    //2.查询用户是否存在
    const user = await User.findById(_id)
    if (!user) {return res.status(422).send('用户错误')}
    //3. 查看email
    if (email !== user.email){
        res.status(422).send('用户错误')
    } else {
        //用户存在，查看权限
        if (user.isAdmin === '0'){
            res.status(409).send('没有权限')
        } else if (user.isAdmin === '1'){
            next()
        }
    }
}

// Route: get user info list
router.get('/userlist', isAdmin, async (req, res) => {
    const list = await User.find()
    res.send(list)
})

// Route: register
router.post('/register', async (req, res)=>{

    // generate confirmationCode
    const token = jwt.sign({email: req.body.email}, key.secretVerification)

    const newUserInfo = {
        //username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        status: 'Pending',
        confirmationCode: token,
    }

    // // check `username`
    // const userCheck_1 = await User.findOne({username: newUserInfo.username})
    // if (userCheck_1) { return res.status(409).send('username already exists') }
    // check `email`
    const userCheck_2 = await User.findOne({email: newUserInfo.email})
    if (userCheck_2) { return res.status(409).send('email already registered') }

    const newUser = await new User(newUserInfo).save()

    // send verification email
    // (temporarily removed)
    //await nodemailer.sendConfirmationEmail(newUserInfo.name, newUserInfo.email, newUserInfo.confirmationCode)

    res.send(newUser)
})

// Route: confirm registration
router.get('/confirm/:confirmationCode', async (req, res)=>{
    User.findOne({confirmationCode: req.params.confirmationCode})
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." })
            }

            user.status = "Active"
            user.save((err) => {
                if (err) { return res.status(500).send({ message: err }) }
                else { return res.send("Email confirmed") }
            })
        })
        .catch((e) => console.log("error", e));
})

// Route: login
router.post('/login', async (req, res)=>{
    // 1. 查询用户是否存在
    const user = await User.findOne({username: req.body.email})
    if (!user) { return res.status(422).send('该用户不存在') }

    // 2. 用户存在，解密并判断密码
    let isPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!isPassword) { return res.status(422).send('密码错误') }

    // 3. check whether the account is activated
    if (user.status !== "Active") { return res.status(401).send("Pending Account. Please Verify Your Email!") }

    // 4. 返回 jwt token
    const _id = user._id;
    const email = user.email;
    const token = jwt.sign({_id, email}, key.secret, {expiresIn:'24h'})
    res.send(token)
})



module.exports = router
