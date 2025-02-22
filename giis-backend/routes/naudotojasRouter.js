const express = require('express');
const router = express.Router();
const naudotojasController = require('../controllers/naudotojasController');

router.get('/naudotojas', naudotojasController.getAllNaudotojas);
router.get('/naudotojas/:naudotojo_tipas', naudotojasController.getAllNaudotojasByType);
router.get('/naudotojotipas', naudotojasController.getAllNaudotojoTipas);
router.get('/naudotojas/gydytojas/:gydytojoId', naudotojasController.getAllNaudotojasByGydytojasId)

module.exports = router;