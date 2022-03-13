const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const { secret } = require('../config/key')
const router = express.Router()


//验证身份中间件
const isAdmin = async (req, res, next)=>{
    //jwt-token
    let _id = ""
    let username = ""

    try {
        const token = req.headers.authorization.split(' ').pop()

        const jwtDecoded = jwt.verify(token, secret)
        _id = jwtDecoded._id
        username = jwtDecoded.username
    } catch {
        return  res.status(422).send('token不合法')
    }

    //2.查询用户是否存在
    const user = await User.findById(_id)
    if (!user) {return res.status(422).send('用户错误')}
    //3. 查看username
    if (username !== user.username){
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

//获取用户列表
router.get('/userlist', isAdmin, async (req, res) => {
    const list = await User.find()
    res.send(list)
})

//注册
router.post('/register', async (req, res)=>{

    const newUserInfo = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        isAdmin: req.body.isAdmin
    };

    const user = await User.findOne({username: newUserInfo.username})
    if (user) { return res.status(409).send('该用户已存在') }

    const newUser = await new User(newUserInfo).save()
    res.send(newUser)
})

//登录
router.post('/login', async (req, res)=>{
    // 1. 查询用户是否存在
    const user = await User.findOne({username: req.body.username})
    if (!user) {return res.status(422).send('该用户不存在')}

    // 2. 用户存在，解密并判断密码
    let isPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!isPassword) { return res.status(422).send('密码错误') }

    // 3. 返回token
    const { _id, username } = user
    const token = jwt.sign({_id, username}, secret, {expiresIn:'24h'})
    res.send(token)
})



module.exports = router
