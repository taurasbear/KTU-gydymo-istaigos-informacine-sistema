const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticateController');

router.post('/login', authenticateController.login);
router.post('/register', authenticateController.register);
router.get('/logout', authenticateController.logout);
router.get('/user', authenticateController.getUser);

module.exports = router;