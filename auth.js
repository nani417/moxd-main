let jwt = require('jsonwebtoken');
const CONSTANTS = require('./../config/constants');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

let verify = (req, res, next) => {
  let token
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    token = authorization.split(' ')[1];
  }else{
    token = null
  }

  if (token) {

    jwt.verify(token, 'moshimoshi@123#@!', (err, tokenData) => {
      if (err) {
        console.log(err)
        res.status(CONSTANTS.SECURE_TOKEN_INVALID_CODE).json({
          error: true,
          message: CONSTANTS.SECURE_TOKEN_INVALID,
        });
      } else {
          req.payload = tokenData
          next();
      }
    });
  }else{
    res.json({code : 300, message : "No Secure Token", data : null});
  }
}


module.exports = {
  verify:verify,
};