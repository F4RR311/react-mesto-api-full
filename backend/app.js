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
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
//const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
// Слушаем 3000 порт
const { PORT = 3001 } = process.env;



const allowedCors = {
  origin: [
    'http://localhost:3001',
    'http://domainname.students.nomoredomains.sbs',
    'http://domainname.students.nomoredomains.sbs',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });


app.use(cors(allowedCors));
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
app.post('/signup', validUser, createUser);
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

// app.get('/signout', (req, res) => {
//   res.clearCookie('jwt').send({ message: 'Выход' });
// });

app.use('*', (req, res, next) => next(
  new NotFoundError('Запрошен не существующий ресурс'),
));


app.use(errors());
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
