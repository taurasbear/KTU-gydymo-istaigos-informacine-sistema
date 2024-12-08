const express = require('express');
const router = express.Router();
const darboLaikasController = require('../controllers/darboLaikasController');

router.post('/darbolaikas/:gydytojasId', darboLaikasController.getAllDarboLaikasWithoutGydytojasLaikas);

module.exports = router;