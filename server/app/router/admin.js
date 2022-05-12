const express = require('express')

const { isAdmin, isNormalLogin } = require('../middleware/authentication')

const router = express.Router()


// get user info list
router.get('/userlist/:page', isAdmin, require('./admin/userlist'))

// edit user profile
router.post('/profile-edit', isAdmin, require('./admin/profile-edit'))

// update user password
router.post('/password-edit', isAdmin, require('./admin/password-edit'))

// get the notelist (note community)
router.get('/notelist/:page', isNormalLogin, require('./admin/notelist'))

module.exports = router
