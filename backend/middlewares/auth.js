const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports.auth = (req, res, next) => {
  const { JWT_SECRET = 'some-secret-key' } = process.env;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new Unauthorized('Необходима авторизация'));
  }
  const token = Unauthorized.replace(/^\S+/, '').trim();

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
