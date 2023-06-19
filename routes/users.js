const router = require('express').Router();

const { getUser, updateProfile, getMe } = require('../controllers/users');
const { authorization } = require('../middlewares/auth');
const { updateUserValidation } = require('../utils/validation');

router.get('/', authorization, getUser);
router.get('/me', authorization, getMe);
router.patch('/me', updateUserValidation, authorization, updateProfile);

module.exports = router;
