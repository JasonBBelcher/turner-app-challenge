const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    author: {
        type: String
    },
    text: {
        type: String
    }
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;