const express = require('express')

const { isNormalLogin } = require('../middleware/authentication')

const router = express.Router()


// Route: register
router.post('/register', require('./user/register'))

// Route: verify email
router.post('/register/email-verification-code', require('./user/register-email-verification-code'))

// Route: login
router.post('/login', require('./user/login'))

// validate token (is token valid & is user admin)
router.get('/validate-token', require('./user/validate-token'))


// User settings
// get info of this user
router.get('/profile', isNormalLogin, require('./user/profile'))

// set nickname
router.post('/set-name', isNormalLogin, require('./user/set-name'))

// set new password by old password (user should be already logged in)
router.post('/set-pwd/old-pwd', isNormalLogin, require('./user/set-pwd-old-pwd'))

// set new password by email (Step1: get verification code)
router.post('/set-pwd/email/verification-code', require('./user/set-pwd-email-verification-code'))

// set new password by email (Step2: set new password)
router.post('/set-pwd/email/set', require('./user/set-pwd-email-set'))

// get user avatar image (users do not need to login to get avatar)
router.get('/get-avatar', require('./user/get-avatar'))

// set user avatar image
router.post('/set-avatar', isNormalLogin, require('./user/set-avatar'))

module.exports = router
