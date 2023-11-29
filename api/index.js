const app = require("../index.js")
const load = require('express-load')

load('public/controllers')
.then('public/routes')
.into(app)

module.exports = app