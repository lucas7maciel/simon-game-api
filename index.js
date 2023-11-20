
const express = require('express');
const bodyParser = require('body-parser');
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
  { info: 'API is working correctly' })
)

app.get('/records', qr.getRecords);
app.get('/records/:name', qr.getUserRecords);
app.post('/saveRecord', qr.saveRecord);
app.post('/createUser', qr.createUser)
app.get('/users/login/:nick/:password', qr.login)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
