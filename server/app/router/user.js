const express = require('express')

const { isNormalLogin } = require('../middleware/authentication')

const router = express.Router()


// Route: register
router.post('/register', require('./user/register'))

// Route: verify email
router.post('/register/emailVerificationCode', require('./user/register_emailVerificationCode'))

// Route: login
router.post('/login', require('./user/login'))

// User settings
// get info of this user
router.get('/profile', isNormalLogin, (req, res)=>{
    return res.status(200).send(req.body._id)
})


module.exports = router
