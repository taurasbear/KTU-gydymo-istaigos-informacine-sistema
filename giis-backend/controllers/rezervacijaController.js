const db = require('../models');

exports.getAllReservationsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Get the Gydytojas ID by userId
        const gydytojas = await db.Gydytojas.findOne({ where: { naudotojas_id: userId } });
        if (!gydytojas) {
            return res.status(404).json({ message: "Gydytojas not found" });
        }

        // Get all GydytojoDarboLaikas rows by Gydytojas ID
        const gydytojoDarboLaikasRows = await db.GydytojoDarboLaikas.findAll({ where: { gydytojas_id: gydytojas.id } });

        // Get all Rezervacija rows by GydytojoDarboLaikas ID
        const rezervacijos = [];
        for (const darboLaikas of gydytojoDarboLaikasRows) {
            const rezervacijaRows = await db.Rezervacija.findAll({ where: { gydytojo_darbo_laikas_id: darboLaikas.id } });
            for (const rezervacija of rezervacijaRows) {
                // Get the Naudotojas for each Rezervacija
                const pacientas = await db.Naudotojas.findByPk(rezervacija.naudotojas_id);
                rezervacijos.push({
                    rezervacija,
                    pacientas
                });
            }
        }

        res.json(rezervacijos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
};