require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { validLogin, validUser } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
//const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors= require('cors');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

const options = {
origin: [
   'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'domainname.students.nomoredomains.sbs',
  'http://domainname.students.nomoredomains.sbs',
  'https://domainname.students.nomoredomains.sbs',
  'https://api.mymesto.nomoredomains.xyz',
  'http://api.mymesto.nomoredomains.xyz',
],
  credentials:true,
}

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validLogin, login);
//app.post('/signout', auth, logout);
app.post('/signup', validUser, createUser)
app.use(auth);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => next(
  new NotFoundError('Запрошен не существующий ресурс'),
));

//app.use(auth);

app.use(errors());
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
