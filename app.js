
const express = require('express');
const bodyParser = require('body-parser');
const load = require('express-load')
const Pool = require('pg').Pool

const app = express();
const port = process.env.port

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.dbName,
  password: process.env.password,
  port: process.env.dbPort
})

module.exports = {pool}

app.get('/', (req, res) => res.json(
  { info: 'API is working correctly' })
)

load('controllers')
.then('routes')
.into(app)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app
