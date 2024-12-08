const express = require('express');
const router = express.Router();
const rezervacijaController = require('../controllers/rezervacijaController');

router.get('/rezervacija/:userId', rezervacijaController.getAllRezervacijaByUserId);
router.post('/rezervacija', rezervacijaController.createRezervacija);

module.exports = router;