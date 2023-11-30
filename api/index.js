const {app} = require("../index")
const records = require("../public/routes/records")

//const funcs = require("../public/controllers/records")

app.use("/", records)
app.get("/teste", (req, res) => {
  return res.json({ info: 'Rota de teste funcionando' })
})

module.exports = app

