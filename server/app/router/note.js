const express = require('express');

const { isNormalLogin } = require('../middleware/authentication');

const router = express.Router();

router.post('/upload-pic', isNormalLogin, require('./note/upload-pic'));

// user modify the folder: modify & create
router.post('/modify-folder', isNormalLogin, require('./note/modify-folder'));

// user modify the note: modify & create
router.post('/modify-note', isNormalLogin, require('./note/modify-note'));

// user delete the note
router.post('/delete-note', isNormalLogin, require('./note/delete-note'));

// user deleter the folder
router.post('/delete-folder', isNormalLogin, require('./note/delete-folder'));
module.exports = router;