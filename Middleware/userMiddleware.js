const response = require('../Utils/response');
const validator = require('validator');
const isEmpty = require("../Utils/isEmpty");
const isRequired = require("../Utils/isRequired");

class userMiddleware {

  /**
   * Validate Email and Password helper
   * 
   * @param {*} res 
   * @param {*} body 
   * @param {*} next 
   */
  static async validateEmailPass(res, body, next) {
    const { emailAddress, password } = body;
    const errObj = {};
    if (emailAddress) {
      const checkemail = await validator.isEmail(emailAddress);
      if (!checkemail) errObj.emailAddress = `Email value ${emailAddress} is invalid`;
    }
    const checkpassword = await validator.isLength(password, {
      min: 8,
    });
    if (!checkpassword) errObj.passwordLength = 'Password should be a minimum of 8 characters';
    const condition = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const alphanumericpassword = await condition.test(password);
    if (!alphanumericpassword) errObj.passwordType = 'Password should be alphanumeric';
    if (Object.keys(errObj).length === 0) {
      return isEmpty(body, res, next);
    } else {
      return next(response(res, 422, errObj));
    }
  }

  /**
   * Validating a signed in parameters
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async validateSignin(req, res, next) {
    return userMiddleware.validateEmailPass(res, req.body, next);
  }

  /**
   * Validating a sign up parameters
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async validateSignup(req, res, next) {
    const requiredFields = isRequired(req.body, ['emailAddress', 'password', 'userName']);
    if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
      return response(res, 422, requiredFields.map(err => err));
    }
    return userMiddleware.validateEmailPass(res, req.body, next);
  }
}

module.exports = userMiddleware;
