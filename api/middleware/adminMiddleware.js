const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }



  jwt.verify(token.split(" ")?.[1], config.jwtSecret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: err});
    }

    // Check if the decoded token has an "is_admin" property set to true
    if (decodedToken) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }
  });
};
