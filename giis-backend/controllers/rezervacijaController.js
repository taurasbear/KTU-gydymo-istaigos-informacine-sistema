const db = require('../models');

exports.getAllRezervacijaByUserId = async (req, res) => {
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

exports.createRezervacija = async (req, res) => {
    const { nuo_kada, iki_kada, gydytojo_user_id, naudotojas_id } = req.body;
    console.log('nuo_kada', nuo_kada);
    console.log('iki_kada', iki_kada);
    console.log('gydytojo_user_id', gydytojo_user_id);
    console.log('naudotojas_id', naudotojas_id);
    // Convert nuo_kada and iki_kada to Date objects
    const nuoKadaDate = new Date(nuo_kada);
    const ikiKadaDate = new Date(iki_kada);
    const date = new Date(nuoKadaDate.getFullYear(), nuoKadaDate.getMonth(), nuoKadaDate.getDate());

    try {
        // Find the Gydytojas by naudotojas_id
        const gydytojas = await db.Gydytojas.findOne({ where: { naudotojas_id: gydytojo_user_id } });
        if (!gydytojas) {
            return res.status(404).json({ message: "Gydytojas not found" });
        }

        // Find the GydytojoDarboLaikas by gydytojas_id and date
        const gydytojoDarboLaikas = await db.GydytojoDarboLaikas.findOne({
            where: {
                gydytojas_id: gydytojas.id,
                '$darbo_laikas.data$': date
            },
            include: {
                model: db.DarboLaikas,
                as: 'darbo_laikas'
            }
        });

        if (!gydytojoDarboLaikas) {
            return res.status(404).json({ message: "Gydytojo darbo laikas not found for the given date" });
        }

        // Create the Rezervacija
        const rezervacija = await db.Rezervacija.create({
            nuo_kada: nuoKadaDate,
            iki_kada: ikiKadaDate,
            gydytojo_darbo_laikas_id: gydytojoDarboLaikas.id,
            naudotojas_id: gydytojas.id
        });

        res.json(rezervacija);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
};