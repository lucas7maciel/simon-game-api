
const records = require("express").Router();
const funcs = require("../controllers/records.js")

records.get('/records', funcs.getData);
records.get('/records/:name', funcs.getUserData);
records.post('/records/save', funcs.saveData);

module.exports = records

/*module.exports = (app) => {
  const funcs = app.public.controllers.records

  app.get('/records', funcs.getData);
  app.get('/records/:name', funcs.getUserData);
  app.post('/records/save', funcs.saveData);
}*/