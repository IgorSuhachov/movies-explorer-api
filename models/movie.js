const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Invalid link',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Invalid link',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Invalid link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
