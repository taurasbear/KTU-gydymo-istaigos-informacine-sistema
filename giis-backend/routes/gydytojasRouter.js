const express = require('express');
const router = express.Router();
const gydytojasController = require('../controllers/gydytojasController');

router.post('/gydytojas/:id', gydytojasController.addGydytojas);

module.exports = router;