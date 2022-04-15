const searchNotes = require('../../functions/noteSearch');


const PAGE_SIZE = 10;


module.exports = async (req, res) => {
    const filter = {visibility: 'public'};
    await searchNotes(req, res, PAGE_SIZE, filter);
}
