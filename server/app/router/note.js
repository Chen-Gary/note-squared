const express = require('express');

const { isNormalLogin } = require('../middleware/authentication');

const router = express.Router();


router.post('/upload-pic', isNormalLogin, require('./note/upload-pic'));


module.exports = router;
