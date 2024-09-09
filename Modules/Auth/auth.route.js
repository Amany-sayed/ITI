const router = require('express').Router();
const { signup, login } = require('./auth.controller.js');
const { authMiddleware } = require('../../middlewares/auth.js');
const { logout } = require('./auth/logout.js');


router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/logout', authMiddleware, logout); 

module.exports = router;
