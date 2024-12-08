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

exports.getStartRezervacijaHours = async (req, res) => {
    const gydytojasId = req.params.gydytojasId;
    const { date } = req.body;
    const parsedDate = new Date(date);

    parsedDate.setHours(parsedDate.getHours() + 2);
    const gydytojoDarboLaikas = await db.GydytojoDarboLaikas.findOne({
        where: {
            gydytojas_id: gydytojasId
        },
        include: {
            model: db.DarboLaikas,
            as: 'darbo_laikas',
            required: true,
            where: {
                data: parsedDate
            }
        }
    });

    if (!gydytojoDarboLaikas) {
        res.json({ message: "Gydytojas nedirba pasirinktą datą." });
        return;
    }

    let startHours = [];
    const startHour = gydytojoDarboLaikas.darbo_laikas.nuo_kada.getHours();
    const endHour = gydytojoDarboLaikas.darbo_laikas.iki_kada.getHours();
    for (let i = startHour; i < endHour; i++) {
        startHours.push(i);
    }

    const rezervacijaExisitingStartHours = await db.Rezervacija.findAll(
        {
            where: {
                gydytojo_darbo_laikas_id: gydytojoDarboLaikas.id
            },
            attributes: ['nuo_kada']
        }
    )
    const existingStartHours = rezervacijaExisitingStartHours.map(rezervacija => rezervacija.nuo_kada.getHours());

    startHours = startHours.filter(hour =>
        !existingStartHours.some(existingHour =>
            Math.abs(existingHour - hour) < 1
        )
    );

    res.json(startHours);
}