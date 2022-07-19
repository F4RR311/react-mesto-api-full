const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {

    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};






// const jwt = require('jsonwebtoken');
// const Unauthorized = require('../errors/Unauthorized');
//
// const { NODE_ENV, JWT_SECRET } = process.env;
//
// const auth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     throw new UnauthorizedError('Ошибка авторизации');
//   }
//   let payload;
//   try {
//     payload = jwt.verify(token,  NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//
//   } catch (error) {
//     throw new Unauthorized('Необходима авторизация');
//   }
//   req.user = payload;
//
//   next();
// };
//
// module.exports = auth;
