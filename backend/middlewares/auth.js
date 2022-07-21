const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;
  return next();
};

// const { NODE_ENV, JWT_SECRET } = process.env;
//
// module.exports = (req, res, next) => {
//   console.log('is authorized');
//   const token = req.cookies.jwt;
//   if (!token) {
//     next(new Unauthorized('Ошибка авторизации: Не передан токен'));
//     return;
//   }
//   let payload;
//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//   } catch (error) {
//     next(new Unauthorized('Ошибка авторизации'));
//     return;
//   }
//   console.log(payload);
//   req.user = payload;
//   next();
// };
//
//
