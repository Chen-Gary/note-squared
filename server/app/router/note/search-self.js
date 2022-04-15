const searchNotes = require('../../functions/noteSearch');


const PAGE_SIZE = 10;


module.exports = async (req, res) => {
    const filter = {author: req.body.user_id};
    await searchNotes(req, res, PAGE_SIZE, filter);
}
