const mongoose = require('mongoose');
const Comment = require('./comment-schema');


const TitleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    comments: {
        type: [Comment]
    }
});

const Title = mongoose.model('Title', TitleSchema);
module.exports = Title;