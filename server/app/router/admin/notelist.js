const Note = require("../../model/Note");

const PAGE_SIZE = 10;

module.exports = async (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const count = (await Note.find({visibility: 'public'})).length;
    
    // how many pages
    const total = Math.ceil(count / PAGE_SIZE);

    const start = (page-1) * PAGE_SIZE;

    // get note info
    const notes = await Note.find({visibility: 'public'}).limit(PAGE_SIZE).skip(start);

    res.status(200).send({
        page: page,
        total: total,
        entriesInCurrentPage: notes.length,
        pagesize: PAGE_SIZE,
        notes: notes
    })
}