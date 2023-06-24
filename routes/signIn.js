const router = require('express').Router();
const { login } = require('../controllers/users');
const { sigInValidation } = require('../utils/validation');

router.post('/signin', sigInValidation, login);

module.exports = router;
