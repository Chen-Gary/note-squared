const express = require('express')
const { setEncode, contrast } = require('../util/encode')
const User = require('../model/User')
const router = express.Router()

// 加密加盐
const salt = 'oseuhflashdfh'

//验证身份中间件
const isAdmin = async (req, res, next)=>{
    //1. 获取token
    const token = req.headers.authorization.split(' ')[1]
    const id = token.split('.')[0]
    const username = token.split('.')[1]
    console.log(id, username)
    //2.查询用户是否存在
    const user = await User.findById(id)
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

// get user list
router.get('/', isAdmin, async (req, res) => {
    // res.send('hello userRouter')
    const list = await User.find()
    res.send(list)
})

//register
router.post('/register', async (req, res)=>{
    const user = await User.findOne({username: req.body.username})
    if (user) { return res.status(409).send('该用户已存在') }
    //密码加密
    req.body.password = setEncode(req.body.password, salt)
    const newUser = await new User(req.body).save()
    res.send(newUser)
})

//login
router.post('/login', async (req, res)=>{
    // 1. 查询用户是否存在
    const user = await User.findOne({username: req.body.username})
    if (!user) {return res.status(422).send('该用户不存在')}
    // 2. 用户存在，判断密码
    // if (req.body.password !== user.password) {
    //     return res.status(422).send('密码错误')
    // } else {
    //     res.send('token')
    // }
    // 2.5解密
    let isPassword = contrast(req.body.password, user.password, salt)
    if (!isPassword) { return res.status(422).send('密码错误') }
    // res.send(user)
    // 返回token
    const token = user._id + '.' + req.body.username
    res.send(token)
})

//验证
router.get('/verify', async (req, res)=>{
    //1. 获取token
    const token = req.headers.authorization.split(' ')[1]
    const id = token.split('.')[0]
    const username = token.split('.')[1]
    console.log(id, username)
    //2.查询用户是否存在
    const user = await User.findById(id)
    if (!user) {return res.status(422).send('用户错误')}
    //3. 查看username
    if (username !== user.username){
        res.status(422).send('用户错误')
    } else {
        //用户存在，查看权限
        if (user.isAdmin === '0'){
            res.status(409).send('没有权限')
        } else if (user.isAdmin === '1'){
            res.send('Admin')
        }
    }
})



module.exports = router
