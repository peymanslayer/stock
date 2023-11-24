const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token.split(" ")?.[1], config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    req.user = user;
    next();
  });
};