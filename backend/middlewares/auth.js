require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    throw new UnauthorizedError('Ошибка авторизации');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret-key');
  } catch (error) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;

  next();
};

module.exports = auth;