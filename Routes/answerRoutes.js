const router = require('express').Router();
//const questionControllers = require('../Controllers/questionControllers');
//const userMiddleware = require('../Middleware/userMiddleware');
const { validateObjId} = require('../Utils/routeAssertations');
const answerControllers = require('../Controllers/answerControllers');
//const question = require('../Models/questionModel')
//const user = require('../Models/userModel');
const isAuthenticated = require('../Utils/authorization');
const questionMiddleware = require('../Middleware/questionMiddleware');
const verify = require('../Utils/verifyToken');

//Post Answer to a Question
router.post(
    '/questions/:id',
    [
      verify,
      validateObjId,
      questionMiddleware.validateQuestion,
      questionMiddleware.validateBodyField
    ],
     answerControllers.respond
);

//update answer
module.exports = router;