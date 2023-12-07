
//packages
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

//settings
const app = express();
const port = process.env.port

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes
const records = require("./routes/records")

app.use("/", records)

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  
  return res.json({ info: 'API is working correctly' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app
