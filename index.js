
const express = require('express');
const bodyParser = require('body-parser');
const load = require('express-load')
const app = express();
const port = 3000;

const qr = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => res.json(
  { info: 'API is working correctly' })//
)

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'me1234',
  port: 5432
})

module.exports = {pool}

load('controllers')
.then('routes')
.into(app)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
