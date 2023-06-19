require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');

const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const InternalServerError = require('../errors/InternalServerError');

const { CastError, ValidationError, DocumentNotFoundError } = mongoose.Error;
const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new InternalServerError('Ошибка по умолчанию')));
};

const getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFound('Пользователь не найден'));
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, password, email } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      password: hash,
      email,
    })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
        }
        if (err.code === 11000) {
          return next(new Conflict('Пользователь уже существует'));
        }
        return next(new InternalServerError('Ошибка по умолчанию'));
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw new BadRequest('Переданы некорректные данные при авторизации пользователя');
  }

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Invalid email or password');
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', {
              expiresIn: '7d',
            });
            return res.send({ token });
          }
          return next(new Unauthorized('Invalid email or password'));
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err instanceof Unauthorized) {
        next(err);
      }
      return next(new BadRequest(err.message));
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof CastError || err instanceof ValidationError) {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      }
      if (err instanceof DocumentNotFoundError) {
        return next(new NotFound('Пользователь с указанным _id не найден.'));
      }
      return next(new InternalServerError('Ошибка по умолчанию'));
    });
};

module.exports = {
  getUser,
  getMe,
  createUser,
  login,
  updateProfile,
};
