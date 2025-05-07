const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/admin', userController.createAdmin);

module.exports = router; 