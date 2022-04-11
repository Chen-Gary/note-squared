const User = require("../../model/User");

// the following attributes are not returned
const usersProjection = {
    password: false,
    __v: false,
}

const pagesize = 10;

module.exports = async (req, res) => {
    // user input
    //TODO: check whether `parseInt(req.params.page)` success or not ==> it seems that this is already done by `||`
    const page = parseInt(req.params.page) || 1;

    // total user count
    const count = await User.countDocuments({});

    // total page count
    const total = Math.ceil(count / pagesize);

    const start = (page - 1) * pagesize;

    // get user info from database
    // need to make the returned user list reversely ordered?
    const users = await User.find({}).limit(pagesize).skip(start);

    res.status(200).send({
        page: page,
        total: total,
        entriesInCurrentPage: users.length,
        pagesize: pagesize,
        users: users
    });
}
