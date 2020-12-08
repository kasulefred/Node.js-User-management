const ObjectID = require('mongodb');
const response = require('../Utils/response');
const isRequired = require("../Utils/isRequired");
const isEmpty = require("../Utils/isEmpty.js");

/* istanbul ignore file */

/**
 * Router assertations method
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} options 
 * @param {*} extra 
 */
const requiredAssertations = (req, res, next, options, extra) => {
  const requiredFields = isRequired(req.body, options);
  if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
    return response(res, 422, requiredFields.map(err => err));
  }
  if (extra) return isEmpty(extra, res, next);
  return next();
}

/**
 * Validating Object ID
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateObjId = (req, res, next) => {
  const { id } = req.params;
  try {
    new ObjectID(id);
    return next();
  } catch (error) {
    return response(res, 400,"Invalid Id passed");
  }
}

module.exports = {
  requiredAssertations,
  validateObjId
};
