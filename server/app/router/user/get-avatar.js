const User = require("../../model/User");

module.exports = async (req, res) => {
    const query = User.findOne({_id: req.query.uid});
    query.select('_id avatar');
    query.exec((err, user)=>{
        if (err) { return res.status(404).send({message: 'user with _id not found'}); }

        res.status(200).send({
            user_id: user._id,
            avatarExist: (user.avatar !== null),
            url: `/static/avatar/${user.avatar}`
        });
    });
}
