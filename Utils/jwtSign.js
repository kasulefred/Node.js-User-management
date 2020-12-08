const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const response = require('./response');

dotenv.config();

/* istanbul ignore next */
/**
 * Generate Token
 * 
 * @param {*} payload 
 * @param {*} exp
 */
const generateToken = async (payload, exp = '30d') => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp
  });

  return token;
};

/**
 * Verify Token
 * @param {*} token 
 * @param {*} res 
 */
const verifyToken = (token, res) => jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return response(res, 401, err.message);
  }
  return decoded;
});


module.exports = {
  generateToken,
  verifyToken
}