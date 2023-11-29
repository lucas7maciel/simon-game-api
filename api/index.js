const {app} = require("../index")
const records = require("../public/routes/records")

app.use("/api/", records)

module.exports = app

