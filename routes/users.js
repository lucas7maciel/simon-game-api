module.exports = (app) => {
  const route = app.controllers.users

  app.post('/users/signup', route.signUp)
  app.get('/users/signin/:nick/:password', route.signIn) //tirar esses argumentos na url
}