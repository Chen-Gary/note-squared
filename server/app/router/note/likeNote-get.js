// get the the liked of note of a user
const Like = require('../../model/Like');
const Note = require('../../model/Note');

// just need the user id
module.exports = async (req, res) => {
    const _userId = req.body.user_id;
    
    // find the like relations
    const likes = await Like.find({user: _userId});

    // return the note list
    var likeList = [];
    for (var i=0; i<likes.length; i++){
        const noteFound = await Note.findById(likes[i].note);
        likeList.push({
            title: noteFound.title,
            description: noteFound.description,
            id: noteFound._id
        });
    }
    return res.status(200).json({list: likeList});
}