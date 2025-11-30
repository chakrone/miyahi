const jwt = require('jsonwebtoken');
const env = require('../config/environment');

// Sign a JWT token
function sign(payload, expiresIn = '1d') {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

// Verify a JWT token
function verify(token) {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    return null; // Invalid token
  }
}

module.exports = {
  sign,
  verify
};
