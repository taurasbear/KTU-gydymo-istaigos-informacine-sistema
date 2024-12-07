const db = require('../models');

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