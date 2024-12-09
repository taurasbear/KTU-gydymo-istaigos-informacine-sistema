const express = require('express');
const router = express.Router();
const zinuteController = require('../controllers/zinuteController');

router.get('/zinute', zinuteController.getAllZinutesByUserIdGydytojasId);
router.post('/zinute', zinuteController.createZinute);

module.exports = router;