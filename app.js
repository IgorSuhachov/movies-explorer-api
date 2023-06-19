require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const error = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errors());
app.use(error);

mongoose
  .connect('mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
