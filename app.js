//Require Express
const express = require('express');
//Create Express application 
const app = express();
//Requre dotenv to handle environment variables
const dotenv = require('dotenv');
//Require Mongoose 
const mongoose = require('mongoose');

const HOST = process.env.HOST || '127.0.0.1';

const PORT = process.env.PORT || 5000;

//Configure dotenv
dotenv.config();

//Import Routes
const userRouter = require('./Routes/userRoutes');
const questionRouter =require('./Routes/questionRoutes');
const answerRouter = require('./Routes/answerRoutes')

//Application Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router Middlerware
app.use('/api/v1/', userRouter);
app.use('/api/v1/', questionRouter);
app.use('/api/v1/', answerRouter);

//Connect App to Database
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;

db.on('eeror', (error) => {
    console.log('Connection Error!');
});

db.once('open', () => {
    console.log('Database Connected.')
})

//Listen for connections
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}/`);
});