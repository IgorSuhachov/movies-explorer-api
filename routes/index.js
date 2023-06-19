const router = require('express').Router();

const { requestLogger, errorLogger } = require('../middlewares/logger');

const userRouter = require('./users');
const movieRouter = require('./movies');
const signInRouter = require('./signIn');
const signUpRouter = require('./signUp');

const NotFound = require('../errors/NotFound');

router.use(requestLogger);

router.use('/', signInRouter);
router.use('/', signUpRouter);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFound('NOT FOUND'));
});

router.use(errorLogger);

module.exports = router;
