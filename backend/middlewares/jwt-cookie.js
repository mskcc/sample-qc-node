const jwtInCookie = require('jwt-in-cookie');
const apiResponse = require('../helpers/apiResponse');
exports.authenticateRequest = function (req, res, next) {
  if (process.env.ENV === 'PROD') {
    next();
    return;
  }
  try {
    let user = jwtInCookie.validateJwtToken(req);
    console.log(user);
    res.user = user;
  } catch (err) {
    // console.log('not authorized');
    return apiResponse.AuthenticationErrorResponse(res, 'Not authorized - please log in');
  }
  next();
};
