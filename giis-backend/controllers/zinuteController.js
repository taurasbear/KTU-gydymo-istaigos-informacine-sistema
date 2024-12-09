const db = require('../models');

exports.getAllZinutesByUserIdGydytojasId = async (req, res) => {
    const userId = req.query.userId;
    const gydytojasId = req.query.gydytojasId;

    const gydytojas = await db.Gydytojas.findOne({ where: { naudotojas_id: gydytojasId } });
    if (!gydytojas) {
        return res.status(404).json({ message: "Gydytojas not found" });
    }
    try {
        const zinutes = await db.Zinute.findAll({
            where: {
                naudotojas_id: userId,
                gydytojas_id: gydytojas.id
            }
        });
        res.json(zinutes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}

exports.createZinute = async (req, res) => {
    const { turinys, naudotojas_id, gydytojas_id } = req.body;
    const gydytojas = await db.Gydytojas.findOne({ where: { naudotojas_id: gydytojas_id } });
    if (!gydytojas) {
        return res.status(404).json({ message: "Gydytojas not found" });
    }
    try {
        const zinute = await db.Zinute.create({
            turinys,
            naudotojas_id,
            gydytojas_id: gydytojas.id
        });
        const zinutes = await db.Zinute.findAll({
            where: {
                naudotojas_id: naudotojas_id,
                gydytojas_id: gydytojas.id
            }
        });
        res.json(zinutes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}
