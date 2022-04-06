const User = require("../../model/User");

module.exports = async (req, res) => {
    const query = User.findOne({_id: req.body._id});
    query.select('_id avatar');
    query.exec((err, user)=>{
        if (err) { return res.status(404).send({message: 'user with _id not found'}); }

        res.status(200).send({
            _id: user._id,
            avatarExist: (user.avatar !== null),
            avatarUrl: `/static/avatar/${user.avatar}`
        });
    });
}
