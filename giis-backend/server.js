const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport');
const app = express();
const db = require('./models');
const naudotojasRouter = require('./routes/naudotojasRouter');
const gydytojasRouter = require('./routes/gydytojasRouter');
const authenticateRouter = require('./routes/authenticateRouter')
const darboLaikasRouter = require('./routes/darboLaikasRouter')
const gydytojoDarboLaikasRouter = require('./routes/gydytojoDarboLaikasRouter')
const rezervacijaRouter = require('./routes/rezervacijaRouter');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({ force: true }).then(async () => {
    console.log("Database connected")

    app.use('/api', naudotojasRouter);
    app.use('/api', gydytojasRouter);
    app.use('/api', authenticateRouter);
    app.use('/api', darboLaikasRouter);
    app.use('/api', gydytojoDarboLaikasRouter);
    app.use('/api', rezervacijaRouter);

    app.get("/api/users", async (req, res) => {
        await db.Naudotojas.findAll().then(users => {
            res.json(users)
        }
        ).catch(err => {
            console.error(err)
            res.status(500).json({ message: "Error occurred" })
        })
    })

    app.listen(5000, () => { console.log("Server started on port 5000") })
}
).catch(err => {
    console.error("Unable to connect to the database:", err)
})