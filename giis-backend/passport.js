const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./models');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    console.log('----> LocalStrategy:', username, password);
    const user = await db.Naudotojas.findOne({ where: { prisijungimo_vardas: username } });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await bcrypt.compare(password, user.slaptazodis);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.Naudotojas.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;