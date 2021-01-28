const jwtInCookie = require('jwt-in-cookie');
const apiResponse = require('../helpers/apiResponse');
exports.authenticateRequest = function (req, res, next) {
  // console.log(req.cookies);
  if (process.env.ENV === 'PROD') {
    next();
    return;
  }
  if (process.env.ENV !== 'PROD') {
    res.user = {
      _id: '5f77781ff303607ab376616e',
      firstName: 'Anna',
      lastName: 'Patruno',
      username: 'patrunoa',
      title: 'Supervisor, Molecular Diagnostic Lab',
      isLabMember: true,
      isAdmin: true,
      isPM: false,
      isUser: false,
      loginLastDate: '2021-01-22T20:14:34.117Z',
      hierarchy: [],
      __v: 0,
      iat: 1611346652,
      exp: 1611353852,
    };
  }
  try {
    let user = jwtInCookie.validateJwtToken(req);
    console.log(user);
    res.user = user;
  } catch (err) {
    console.log('not authorized');
    return apiResponse.AuthenticationErrorResponse(res, 'Not authorized - please log in');
  }
  next();
};
