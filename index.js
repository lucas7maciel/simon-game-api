
const express = require('express');
const bodyParser = require('body-parser');
const load = require('express-load')
const Pool = require('pg').Pool
require('dotenv').config()

const app = express();
const port = process.env.port

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

//module.exports = {pool}

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  
  return res.json({ info: 'API is working correctly' })
})

/*load('public/controllers')
.then('public/routes')
.into(app)*/

app.get("/teste/teste", (request, res) => {
  pool.query('SELECT * FROM records ORDER BY points DESC', (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

//module.exports = {app, pool}
