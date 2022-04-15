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

// user get his local folders and notes
router.post('/local-folder-notes-get', isNormalLogin, require('./note/local-folder-notes-get'));

// user likes a particular note
router.post('/like-note', isNormalLogin, require('./note/like-note'));

// user fork the note
router.post('/fork-note', isNormalLogin, require('./note/fork-note'));

// search all public notes (user do not have to login)
router.get('/search-public', require('./note/search-public'));

// search public/private notes of current user
router.get('/search-self', isNormalLogin, require('./note/search-self'));


module.exports = router;
