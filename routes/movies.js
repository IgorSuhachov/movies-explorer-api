const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { authorization } = require('../middlewares/auth');
const { createMovieValidation, movieIdValidation } = require('../utils/validation');

router.get('/', authorization, getMovies);
router.post('/', authorization, createMovieValidation, createMovie);
router.delete('/:movieId', authorization, movieIdValidation, deleteMovie);

module.exports = router;
