const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token.split(" ")?.[1], config.development.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    next();
  });
};