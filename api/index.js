const {app} = require("../index")
const records = require("../public/routes/records")

app.use("/", records)

module.exports = app

