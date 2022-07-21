const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');
const BadRequestError = require('../errors/BadRequestError');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password") // в случае аутентификации хеш пароля нужен
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized("Неправильные почта или пароль"));
      }
      return Promise.all([bcrypt.compare(password, user.password), user]);
    })
    .then(([isPasswordCorrect, user]) => {
      if (!isPasswordCorrect) {
        return Promise.reject(new Unauthorized("Неправильная почта или пароль"));
      }
      const token = jwt.sign({ _id: user._id }, "secret-key", {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch(next);
};

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//
//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
//         { expiresIn: '7d' },
//       );
//       res.cookie('jwt', token, {
//         maxAge: 3600000 * 24 * 7,
//         httpOnly: true,
//       });
//       res
//         .status(200)
//         .send({ token, NODE_ENV, JWT_SECRET });
//     })
//     .catch(next);
// };

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//
//   User.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new Unauthorized('Неправильные почта или пароль');
//       }
//
//       return Promise.all([user, bcrypt.compare(password, user.password)]);
//     })
//     .then(([user, isPasswordCorrect]) => {
//       if (!isPasswordCorrect) {
//         throw new Unauthorized('Неправильная почта или пароль');
//       }
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
//         { expiresIn: '7d' },
//       );
//       return res.send({ token });
//     })
//     .catch(next);
// };

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new ErrorNotFound('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};


module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Запрашиваемый пользователь не найден');
      }

      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        next(new ErrorConflict('Вы уже зарегистрированы, выполните вход'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
