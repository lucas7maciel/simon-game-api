
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const Pool = require('pg').Pool
const path = require('path');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'me1234',
  port: 5432
})

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const createUser = (request, response) => {
  const { name, points } = request.body

  pool.query('INSERT INTO records (name, points) VALUES ($1, $2) RETURNING *', [name, points], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })

  response.json({a: "a"})
}

app.get('/', (request, response) => {
  response.json({info: 'Mim dê o cuzinho'})
})

app.post('/register/:name/:points', createUser)

app.listen(port, () => {
  console.log("App rodando")
})

