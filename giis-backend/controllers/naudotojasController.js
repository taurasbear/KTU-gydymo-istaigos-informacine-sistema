const db = require('../models');
const naudotojoTipas = require('../constants/naudotojoTipas');

exports.getAllNaudotojas = async (req, res) => {
    await db.Naudotojas.findAll().then(users => {
        res.json(users)
    }).catch(err => {
        console.error(err)
        res.status(500).json({ message: "Error occurred" })
    })
}

exports.getAllNaudotojasByType = async (req, res) => {
    await db.Naudotojas.findAll({ where: { naudotojo_tipas: req.params.naudotojo_tipas } }).then(users => {
        res.json(users)
    }).catch(err => {
        console.error(err)
        res.status(500).json({ message: "Error occurred" })
    })
}

exports.getAllNaudotojoTipas = async (req, res) => {
    res.json(Object.values(naudotojoTipas))
}