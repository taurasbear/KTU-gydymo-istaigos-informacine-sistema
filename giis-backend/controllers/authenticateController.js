const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json(user.toJSON());
        });
    })(req, res, next);
};

exports.register = async (req, res) => {
    const { username, password, firstName, lastName, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const user = await db.Naudotojas.create({
            prisijungimo_vardas: username,
            slaptazodis: hashedPassword,
            naudotojo_tipas: 'PACIENTAS',
            vardas: firstName,
            pavarde: lastName,
            el_pastas: email,
        });
        res.json(user.toJSON());
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.send('Logged out');
};

exports.getUser = (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(401).send({ message: 'Not authenticated' });
    }
};