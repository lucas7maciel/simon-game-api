module.exports = (app) => {
  const route = app.public.controllers.records

  app.get('/records', route.getData);
  app.get('/records/:name', route.getUserData);
  app.post('/records/save', route.saveData);
}