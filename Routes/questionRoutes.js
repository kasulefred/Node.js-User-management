//Require Express & use Router method
const questionControllers = require('../Controllers/questionControllers');
//const userMiddleware = require('../Middleware/userMiddleware');
const router = require('express').Router();
const { validateObjId} = require('../Utils/routeAssertations');
//const question = require('../Models/questionModel')
//const user = require('../Models/userModel');
const isAuthenticated = require('../Utils/authorization');
const questionMiddleware = require('../Middleware/questionMiddleware')
const verify = require('../Utils/verifyToken');

//Post a Question
router.post('/questions', 
    verify, 
    questionMiddleware.validateFields, 
    questionControllers.create
);

//Get all questions
router.get(
    '/questions/',
     verify,
     questionControllers.index
);

//Get question by id
router.get(
    '/questions/:id',
    verify,
    validateObjId, questionMiddleware.validateQuestion,
    questionControllers.show
);

//delete question by ID
router.delete(
    '/questions/:id',
    verify,
    questionControllers.delete
);

module.exports = router;