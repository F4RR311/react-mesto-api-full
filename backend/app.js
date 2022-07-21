require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { validLogin, validUser } = require('./middlewares/validation');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
//const ErrorNotFound = require('./errors/ErrorNotFound');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;


mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

// CORS
app.use(cors)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validUser, createUser);
app.post('/signin', validLogin, login);

app.use('/users',  usersRoutes);
app.use('/cards',  cardsRoutes);

// app.get('/signout', (req, res) => {
//   res.clearCookie('jwt').send({ message: 'Выход' });
// });

app.use(auth);
app.use(errors());
app.use(errorHandler);
app.use(errorLogger);
// app.use("*", (req, res, next) => {
//   next(new NotFoundError("Страница не найдена"));
// });


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
