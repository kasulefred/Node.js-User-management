const {requiredAssertations} = require("../Utils/routeAssertations");
const question = require("../Models/questionModel");
const response = require("../Utils/response");


class questionMiddleware {

  /**
   * Validating question body
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static validateFields(req, res, next) {
    return requiredAssertations(req, res, next, ['questionBody'], req.body)
  }

  /**
   * Validating questionBody field
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static validateBodyField(req, res, next) {
    return requiredAssertations(req, res, next, ['questionBody'], req.body)
  }

  /**
   * Validate Question field
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async validateQuestion(req, res, next) {
    const { id } = req.params;
    const findQuestion = await question.findById(id);
    if(!findQuestion) return response(res, 404, 'Question not found');
    return next();
  }
}

module.exports = questionMiddleware;
