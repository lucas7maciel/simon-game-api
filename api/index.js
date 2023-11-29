const app = require("../index.js")
const load = require('express-load')

const a = require("../public/controllers/records.js")
const b = require("../public/controllers/users.js")
const c = require("../public/routes/records.js")
const d = require("../public/routes/users.js")
/*load('public/controllers')
.then('public/routes')
.into(app)*/

module.exports = app