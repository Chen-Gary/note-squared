const express = require('express')

const { isAdmin } = require('../middleware/authentication')

const router = express.Router()

// Route: get user info list
router.get('/userlist', isAdmin, require('./admin/userlist'))


module.exports = router
