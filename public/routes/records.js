module.exports = (app) => {
  const funcs = app.public.controllers.records

  app.get('/records', funcs.getData);
  app.get('/records/:name', funcs.getUserData);
  app.post('/records/save', funcs.saveData);
}