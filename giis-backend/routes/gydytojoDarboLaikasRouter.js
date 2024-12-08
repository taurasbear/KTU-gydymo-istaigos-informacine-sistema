const express = require('express');
const router = express.Router();
const gydytojoDarboLaikasController = require('../controllers/gydytojoDarboLaikasController');

router.post('/gydytojodarbolaikas', gydytojoDarboLaikasController.addGydytojoDarboLaikas);

module.exports = router;