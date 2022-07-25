require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { validLogin, validUser } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');
const cors = require("./middlewares/cors");
const auth = require('./middlewares/auth');



const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;


mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

// CORS
app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);



app.post('/signup', validUser, createUser);
app.post('/signin', validLogin, login);


app.use(auth);
app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

app.use(errorLogger);
app.use(errors());





app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({
    message: statusCode === 500 ? "Произошла ошибка на сервере" : message,
  });
  next();
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
