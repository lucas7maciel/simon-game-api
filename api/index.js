const {app} = require("../index")
const records = require("../public/routes/records")

const funcs = require("../public/controllers/records")

app.get("/teste", funcs.getData)
//app.use("/api/", records)

module.exports = app

