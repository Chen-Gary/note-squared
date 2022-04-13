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

// user move the note to another folder
router.post('/move-note', isNormalLogin, require('./note/move-note'));

// user get the content by passing the note-id to backend
router.get('/note-get/:noteId', isNormalLogin, require('./note/note-get'));

// user likes a particular note
router.post('/like-note', isNormalLogin, require('./note/like-note'));

module.exports = router;
