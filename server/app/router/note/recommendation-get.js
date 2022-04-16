// get the recommendation list
const Note = require("../../model/Note");
const { returnRecommendation } = require("../../functions/recommendation");

// this is a get function
module.exports = async (req, res) => {
    const noteList = await returnRecommendation(5);
    return res.status(200).json({list: noteList.data});
}