const mongoose = require('mongoose');
const Movies = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const InternalServerError = require('../errors/InternalServerError');

const { CastError, ValidationError, DocumentNotFoundError } = mongoose.Error;

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movies.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(() => next(new InternalServerError('Ошибка по умолчанию.')));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданные некорректные данные при создании фильма'));
      }
      next(new InternalServerError('Ошибка по умолчанию'));
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movies.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFound('Фильм с указанным _id не найден.'));
      }
      if (movie.owner.toString() !== userId) {
        return next(new Forbidden('У вас нет прав на уделение фильма.'));
      }

      return Movies.findByIdAndRemove(movieId)
        .then((removedMovie) => {
          res.send(removedMovie);
        })
        .catch(() => next(new InternalServerError('Ошибка по умолчанию.')));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequest('Переданы некорректные данные при удалении фильма'));
      }
      if (err instanceof DocumentNotFoundError) {
        return next(new NotFound('Фильм с указанным _id не найден'));
      }
      return next(new InternalServerError('Ошибка по умолчанию'));
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
