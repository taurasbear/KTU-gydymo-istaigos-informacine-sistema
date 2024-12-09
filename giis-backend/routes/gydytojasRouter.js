const express = require('express');
const router = express.Router();
const gydytojasController = require('../controllers/gydytojasController');

router.post('/gydytojas/:id', gydytojasController.addGydytojas);
router.get('/gydytojas', gydytojasController.getAllGydytojas);
router.get('/gydytojas/:userId', gydytojasController.getAllGydytojasByUserId);

module.exports = router;