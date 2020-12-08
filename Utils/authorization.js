const response = require('./response');
const { verifyToken } = require('./jwtSign');

/**
 * User Authorization Handler
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (typeof authorization === 'undefined') {
    return response(res, 401, 'Unauthorized - Header Not Set');
  }

  const token = authorization;
  if (!token) {
    return response(res, 401, 'Access Denied. Please Log In.');
  }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return response(res, 401, 'Error in verification. Please try again');
  }
}

module.exports = isAuthenticated;
