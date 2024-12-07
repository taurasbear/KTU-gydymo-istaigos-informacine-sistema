const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')

app.use(cors())

db.sequelize.sync({ alter: true }).then(async () => {
    console.log("Database connected")

    app.get("/api", (req, res) => {
        res.json({ "users": ["tauras", "emilis", "gabija", "eva", "karolis", "ignas", "liudas"] })
    })

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