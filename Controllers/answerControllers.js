const question = require("../Models/questionModel");
const response = require("../Utils/response");
const answer = require("../Models/answerModel");
const user = require('../Models/userModel')

class answerControllers {
    /**
   * Respond to a question
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async respond (req, res) {
    const { param, user: { _id }, body: { answerBody,  questionID} } = req;
    const { id } = req.params

    const saveResponse = new answer({
      questionID: (await question.findById({_id: req.params.id}).populate('questionID')),
      answerBody: req.body.answerBody,
      authorID: (await user.findById({_id: req.body.authorID})).populate('authorID')
    });
    saveResponse.save(async function( err, data) {
      return response(res, 201, 'New Answer Posted', data);
    });
  }

    //update answer
}

module.exports = answerControllers;