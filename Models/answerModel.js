//Require Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create  answer schema
const answerSchema = new Schema({
    questionID: {
        type: Schema.Types.ObjectId, ref: 'Question'
    },
    answerBody: {
        type: String,
        required: true
    },
    authorID: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    updated: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    }
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    // }]
});

//Create answer model & make it available
module.exports = mongoose.model('Answer', answerSchema);
