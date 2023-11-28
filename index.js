
const express = require('express');
const bodyParser = require('body-parser');
const load = require('express-load')
const Pool = require('pg').Pool
require('dotenv').config()

const app = express();
const port = process.env.port

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

module.exports = {pool}

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results[0].solution)
  });
  
  //return res.json({ info: 'API is working correctly' })
})

load('controllers')
.then('routes')
.into(app)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app
