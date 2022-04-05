const express = require('express')

const router = express.Router()


// Route: register
router.post('/register', require('./user/register'))

// Route: verify email
router.post('/register/emailVerificationCode', require('./user/register_emailVerificationCode'))

// Route: login
router.post('/login', require('./user/login'))


module.exports = router
