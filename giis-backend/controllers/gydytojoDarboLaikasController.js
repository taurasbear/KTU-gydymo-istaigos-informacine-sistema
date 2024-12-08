const db = require('../models');

exports.addGydytojoDarboLaikas = async (req, res) => {
    const { gydytojasId, darboLaikasId } = req.query;
    db.GydytojoDarboLaikas.create({
        gydytojas_id: gydytojasId,
        darbo_laikas_id: darboLaikasId
    }).then(() => {
        res.json({ message: "Gydytojo darbo laikas added" });
    }).catch(err => {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    });
}