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

exports.getAllNaudotojasByGydytojasId = async (req, res) => {
    const gydytojoId = req.params.gydytojoId;

    const gydytojas = await db.Gydytojas.findOne({ where: { naudotojas_id: gydytojoId } });
    if (!gydytojas) {
        return res.status(404).json({ message: "Gydytojas not found" });
    }

    try {
        // Get all GydytojoDarboLaikas rows by Gydytojas ID
        const gydytojoDarboLaikasRows = await db.GydytojoDarboLaikas.findAll({ where: { gydytojas_id: gydytojas.id } });

        // Get all Rezervacija rows by GydytojoDarboLaikas ID
        const pacientai = new Set();
        for (const darboLaikas of gydytojoDarboLaikasRows) {
            const rezervacijaRows = await db.Rezervacija.findAll({ where: { gydytojo_darbo_laikas_id: darboLaikas.id } });
            for (const rezervacija of rezervacijaRows) {
                // Get the Naudotojas for each Rezervacija
                const pacientas = await db.Naudotojas.findByPk(rezervacija.naudotojas_id);
                pacientai.add(JSON.stringify(pacientas)); // Add unique pacientas to the set
            }
        }

        // Convert the set back to an array of objects
        const uniquePacientai = Array.from(pacientai).map(pacientas => JSON.parse(pacientas));

        res.json(uniquePacientai);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}