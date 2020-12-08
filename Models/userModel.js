//Require Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create User Schema
const userSchema = new mongoose.Schema({
    // _id: {
    //     type: Schema.Types.ObjectId
    // },
    userName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    emailAddress: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

//Create User Model & make it available
module.exports = mongoose.model('User', userSchema);
