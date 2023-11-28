const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, refreshToken,register,test } = require('../controllers/authController');

// User login
router.get('/',test);
router.post('/login', login);
router.post('/signup',register)

// Refresh access token
// router.post('/refresh-token', refreshToken);

module.exports = router;
