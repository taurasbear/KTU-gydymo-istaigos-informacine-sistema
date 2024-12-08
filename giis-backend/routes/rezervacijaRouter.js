const express = require('express');
const router = express.Router();
const rezervacijaController = require('../controllers/rezervacijaController');

router.get('/rezervacija/:userId', rezervacijaController.getAllReservationsByUserId);

module.exports = router;