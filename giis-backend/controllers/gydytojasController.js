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