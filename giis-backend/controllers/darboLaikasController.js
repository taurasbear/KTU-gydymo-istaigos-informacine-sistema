const db = require('../models');
const { Op } = require('sequelize');

exports.getAllDarboLaikasWithoutGydytojasLaikas = async (req, res) => {
    try {
        const gydytojasId = req.params.gydytojasId;
        const associatedDarboLaikasRecords = await db.GydytojoDarboLaikas.findAll({
            where: { gydytojas_id: gydytojasId },
            attributes: ['darbo_laikas_id']
        });
        const associatedDarboLaikasIds = associatedDarboLaikasRecords.map(record => record.darbo_laikas_id);

        const associatedDarboLaikasDates = await db.DarboLaikas.findAll({
            where: {
                id: {
                    [Op.in]: associatedDarboLaikasIds
                }
            },
            attributes: ['data']
        });
        const associatedDarboLaikasDatesValues = associatedDarboLaikasDates.map(record => record.data);

        const darboLaikas = await db.DarboLaikas.findAll({
            where: {
                id: {
                    [Op.notIn]: associatedDarboLaikasIds
                },
                data: {
                    [Op.notIn]: associatedDarboLaikasDatesValues
                }
            }
        });

        res.json(darboLaikas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
}