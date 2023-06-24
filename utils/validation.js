const { celebrate, Joi } = require('celebrate');

const regexp = require('./Regexp');

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const sigInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number()
      .integer()
      .min(1895)
      .max(new Date().getFullYear())
      .required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexp),
    trailerLink: Joi.string().required().regex(regexp),
    thumbnail: Joi.string().required().regex(regexp),
    owner: Joi.string().optional(),
    movieId: Joi.number().required(),
    nameRU: Joi.string()
      .pattern(/^[а-яА-Я\s0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/u)
      .required(),
    nameEN: Joi.string()
      .pattern(/^[a-zA-Z\s0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/)
      .required(),
  }),
});

const getUserIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  signUpValidation,
  sigInValidation,
  updateUserValidation,
  createMovieValidation,
  getUserIdValidation,
  movieIdValidation,
};
