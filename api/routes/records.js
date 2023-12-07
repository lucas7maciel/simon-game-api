
const records = require("express").Router();
const funcs = require("../controllers/records.js")

records.get('/records', funcs.getData);
records.get('/records/:name', funcs.getUserData);
records.post('/records/save', funcs.saveData);

module.exports = records
