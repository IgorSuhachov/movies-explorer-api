/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new Unauthorized('Пользователь не авторизован'));
  }

  jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', (err, payload) => {
    if (err) {
      return next(new Unauthorized('Invalid token'));
    }
    req.user = payload;
    next();
  });
};

module.exports = { authorization };
