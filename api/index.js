
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

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app
