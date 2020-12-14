const jwt = require('jsonwebtoken');
const secrets = require('../auth/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Incorrect token'});
      next();
    })
  } else {
    return res.status(400).json({ message: 'Please provide token'});
  }  
};