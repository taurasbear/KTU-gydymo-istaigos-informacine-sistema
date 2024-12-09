const db = require('../models');
const NaudotojoTipas = require('../constants/naudotojoTipas');

exports.addGydytojas = async (req, res) => {
    const naudotojasId = req.params.id;
    const { occupation } = req.body;

    try {
        const naudotojas = await db.Naudotojas.findByPk(naudotojasId);
        if (!naudotojas) {
            return res.status(404).json({ message: "Naudotojas not found" });
        }

        naudotojas.naudotojo_tipas = NaudotojoTipas.GYDYTOJAS;
        const gydytojas = await db.Gydytojas.create({
            naudotojas_id: naudotojasId,
            specialybe: occupation
        });
        await naudotojas.save();

        res.json(gydytojas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}

exports.getAllGydytojas = async (req, res) => {
    try {
        const gydytojai = await db.Gydytojas.findAll();
        let fullGydytojai = [];
        for (let gydytojas of gydytojai) {
            const naudotojas = await db.Naudotojas.findByPk(gydytojas.naudotojas_id);
            fullGydytojai.push({
                id: gydytojas.id,
                specialybe: gydytojas.specialybe,
                naudotojas: {
                    id: naudotojas.id,
                    vardas: naudotojas.vardas,
                    pavarde: naudotojas.pavarde,
                    el_pastas: naudotojas.el_pastas,
                    naudotojo_tipas: naudotojas.naudotojo_tipas
                }
            });
        }
        res.json(fullGydytojai);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}

exports.getAllGydytojasByUserId = async (req, res) => {
    const pacientasId = req.params.userId;
    try {
        // Get all Rezervacija rows by Pacientas ID
        const rezervacijaRows = await db.Rezervacija.findAll({ where: { naudotojas_id: pacientasId } });

        // Get all GydytojoDarboLaikas IDs from Rezervacija rows
        const gydytojoDarboLaikasIds = rezervacijaRows.map(rezervacija => rezervacija.gydytojo_darbo_laikas_id);

        // Get all GydytojoDarboLaikas rows by IDs
        const gydytojoDarboLaikasRows = await db.GydytojoDarboLaikas.findAll({ where: { id: gydytojoDarboLaikasIds } });

        // Get all unique Gydytojas IDs from GydytojoDarboLaikas rows
        const uniqueGydytojasIds = [...new Set(gydytojoDarboLaikasRows.map(darboLaikas => darboLaikas.gydytojas_id))];

        // Get all Gydytojas rows by unique IDs
        const gydytojai = await db.Gydytojas.findAll({ where: { id: uniqueGydytojasIds } });

        // Get Naudotojas details for each Gydytojas
        const fullGydytojai = await Promise.all(gydytojai.map(async (gydytojas) => {
            const naudotojas = await db.Naudotojas.findByPk(gydytojas.naudotojas_id);
            return {
                id: gydytojas.id,
                specialybe: gydytojas.specialybe,
                naudotojas: {
                    id: naudotojas.id,
                    vardas: naudotojas.vardas,
                    pavarde: naudotojas.pavarde,
                    el_pastas: naudotojas.el_pastas,
                    naudotojo_tipas: naudotojas.naudotojo_tipas
                }
            };
        }));

        res.json(fullGydytojai);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}