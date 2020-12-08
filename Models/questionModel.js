//Require Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create  question schema
const questionSchema = Schema({
    authorID: {
        type: Schema.Types.ObjectId, ref: 'User',
        //type: String,
        required: true
    },
    questionBody: {
        type: String,
        required: true
    },
    answers: [{
       type: Schema.Types.ObjectId, ref: 'Answer'
    }]
});

//Create question model & make it available
module.exports = mongoose.model('Question', questionSchema);


