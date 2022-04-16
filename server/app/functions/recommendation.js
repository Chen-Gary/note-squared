// this file includes functins to implement recommendation
const Note = require("../model/Note");
// w is the parameter for the score function
const w = [3, 3, 4];
const timeRangeOffset = 5; // this is for setting the time range to justify "most recent"

// the function to compute the recommendation score
function getScore(likes, forks, createTime){
    const normalizedTime = createTime.getTime() / 1e8; //  17 minutes as unit create time
    return likes*w[0] + forks*w[1] + normalizedTime*w[2];
}

// the function to update the score in the database
// update when: add like, add recommendation
async function updateScore(noteId) {
    console.log(`invoke update`);
    const note2Update = await Note.findById(noteId);
    if (!note2Update) return false;
    const noteScore = note2Update.like*4 + note2Update.fork*6;
    console.log(`the note score: ${noteScore}`);
    const noteUpdate = await Note.findOneAndUpdate(
        {_id: noteId},
        {score: noteScore}
    );
    if (!noteUpdate) console.log(`cannot update score`);
}

// the function to get the recommendation list
async function returnRecommendation(limit) {
    var result = {
        data: []
    }
    // first sort by date, get the most recent notes
    const noteByDate = await Note.find({visibility: 'public'}).sort({publishDate: -1}).limit(limit*timeRangeOffset);
    // then sort by score
    function compare (a,b) {
        if (a.score < b.score) {
            return -1;
        }
        else if (a.score > b.score) {
            return 1;
        }
        return 0;
    }
    const recommend = noteByDate.sort(compare).reverse();
    result.data = recommend.slice(0, limit);
    return result;
}

module.exports = {
    getScore, updateScore, returnRecommendation
};