const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { notAuthenticated, notAllowed } = require('../misc');

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(500).json('Token is not valid');

      req.user = user;
      next();
    });
  } else {
    return notAuthenticated;
  }
};

const verifyTokenandAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isUserAdmin) {
      next();
    } else {
      res.status(403).json('You are not alowed to do that!');
    }
  });
};

const verifyTokenforAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isUserAdmin) {
      next();
    } else {
      return notAllowed;
    }
  });
};

module.exports = { verifyToken, verifyTokenandAuthorize, verifyTokenforAdmin };
