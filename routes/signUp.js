const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { signUpValidation } = require('../utils/validation');

router.post('/signup', signUpValidation, createUser);

module.exports = router;
