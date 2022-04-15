const Note = require("../model/Note");


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


// `filter` is used as the main constrain in the search query
// e.g. filter = {visibility: 'public'}
async function searchNotes(req, res, PAGE_SIZE, filter) {
    if (req.query.search) {

        // construct query: search all notes with regular expression
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        const searchQuery_count = Note.find(filter)
            .select('_id title description like publishDate')
            .or([{ 'title': { $regex: regex }}, { 'description': { $regex: regex }}, { 'contentMD': { $regex: regex }}])
            .sort({publishDate: 'desc'});

        const searchQuery_data = searchQuery_count.clone();


        // paging
        const page = parseInt(req.query.page) || 1;
        const count = await searchQuery_count.count();  // execute the query for the 1st time to get count
        const total = Math.ceil(count / PAGE_SIZE);
        const start = (page - 1) * PAGE_SIZE;


        // execute the query for the 2nd time to get actual data
        const result = await searchQuery_data
            .limit(PAGE_SIZE).skip(start)
            .exec();


        // send result
        return res.send({
            page: page,
            total: total,
            entriesInCurrentPage: result.length,
            pagesize: PAGE_SIZE,

            notes: result
        });

    } else {
        // what to do if the string is empty?
        return res.status(404).send({message: "no search string sent"});
    }
}


module.exports = searchNotes;
