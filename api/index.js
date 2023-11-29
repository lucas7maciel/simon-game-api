const app = require("../index")

load('../public/controllers')
.then('../public/routes')
.into(app)

module.exports = app