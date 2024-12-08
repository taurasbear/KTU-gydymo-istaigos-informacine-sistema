const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport');
const app = express();
const db = require('./models');
const naudotojasRouter = require('./routes/naudotojasRouter');
const gydytojasRouter = require('./routes/gydytojasRouter');
const authenticateRouter = require('./routes/authenticateRouter')

app.use(cors())

app.use(express.json())

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({ force: true }).then(async () => {
    console.log("Database connected")

    app.get("/api", (req, res) => {
        res.json({ "users": ["tauras", "emilis", "gabija", "eva", "karolis", "ignas", "liudas"] })
    })

    app.use('/api', naudotojasRouter);
    app.use('/api', gydytojasRouter);
    app.use('/api', authenticateRouter);

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