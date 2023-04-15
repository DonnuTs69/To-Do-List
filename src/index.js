const express = require("express")
const cors = require("cors")
const db = require("../models")
const authRoute = require("../routes/authRoute")
const listRoute = require("../routes/listRoute")
const taskRoute = require("../routes/taskRoute")
const statusRoute = require("../routes/statusRoute")

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoute)
app.use("/list", listRoute)
app.use("/task", taskRoute)
app.use("/status", statusRoute)

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    db.sequelize.sync({ alter: true })
    console.log(`APP RUNNING at ${PORT}`)
  }
})
