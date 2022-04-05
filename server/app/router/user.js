const express = require('express')

const User = require('../model/User')
const { isAdmin } = require('../middleware/authentication')

const router = express.Router()


// Route: get user info list
router.get('/userlist', isAdmin, async (req, res) => {
    const list = await User.find()
    res.send(list)
})

// Route: register
router.post('/register', require('./user/register'))

// Route: verify email
router.post('/register/emailVerificationCode', require('./user/register_emailVerificationCode'))

// Route: login
router.post('/login', require('./user/login'))


module.exports = router
