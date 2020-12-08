const question = require("../Models/questionModel");
const response = require("../Utils/response");
//const answer = require("../Models/answerModel");
const user = require('../Models/userModel');
//const answerControllers = require("./answerControllers");

class questionControllers {
  /**
   * Post a Question
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async create (req, res) {
    const { body: { questionBody, authorID }, user: { _id } } = req;

    const newQuestion = new question({
      questionBody,
      authorID: (await user.findById({_id: req.body.authorID})).populate('author')
    });

    newQuestion.save( (err, data) => {
      return response(res, 201, 'New Question Posted', data);
    });
  }

  /**
   * Get All Questions
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async index (req, res) {
    const foundQuestions = await question.find({})
    return response(res, 200,'Successfully fetched questions', foundQuestions);
  }

  /**
   * Get a single question
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async show(req, res) {
    const { id } = req.params;

    const foundQuestion = await question.findById(id)
    return response(res, 200,'Successfully fetched question', foundQuestion);
  }

  //delete question
  static async delete(req, res) {
    const { id } = req.params;
    const deleteQuestion = await question.findByIdAndRemove(id)
    if (!deleteQuestion) {
      return res.status(400).send('That ID was not found', deleteQuestion);
    }
    res.send({msg: 'Item deleted successfully',deleteQuestion});
  }
}

module.exports = questionControllers;
