const User = require("../../model/User");

// the following attributes are not returned
const usersProjection = {
    password: false,
    __v: false,
}

const PAGE_SIZE = 10;

module.exports = async (req, res) => {
    // user input
    //check whether `parseInt(req.params.page)` success or not ==> it seems that this is already done by `||`
    const page = parseInt(req.params.page) || 1;

    // total user count
    const count = await User.countDocuments({});

    // total page count
    const total = Math.ceil(count / PAGE_SIZE);

    const start = (page - 1) * PAGE_SIZE;

    // get user info from database
    // need to make the returned user list reversely ordered?
    const users = await User.find({}).limit(PAGE_SIZE).skip(start);

    res.status(200).send({
        page: page,
        total: total,
        entriesInCurrentPage: users.length,
        pagesize: PAGE_SIZE,
        users: users
    });
}
