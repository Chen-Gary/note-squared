const { isJwtValid } = require('../../middleware/authentication');


module.exports = async (req, res)=>{

    const myRes = {
        isTokenValid: false,

        _id: "empty",
        isAdmin: false,
        role: "empty",
    };

    const myJwtObj = await isJwtValid(req.headers.authorization);

    if (myJwtObj.status === false) { return res.status(200).send(myRes); }

    // the token valid & user exist
    myRes.isTokenValid = true;
    myRes._id = myJwtObj.userEntry._id;
    myRes.isAdmin = (myJwtObj.userEntry.role === 'admin');
    myRes.role = myJwtObj.userEntry.role;

    return res.status(200).send(myRes);
}
