
module.exports = (app) => ({ getData, getUserData, saveData })

const {pool} = require("../app.js")

const getData = (request, response) => {
  pool.query('SELECT * FROM records ORDER BY points DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserData = (request, response) => {
  const name = request.params.name

  pool.query("SELECT * FROM records WHERE name = $1", [name], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const saveData = (request, response) => {
  const { name, points } = request.body
  const date = new Date()
  console.log(`Date ${date}`)

  pool.query(
    'INSERT INTO records (name, points) VALUES ($1, $2) RETURNING *',
    [name, points],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};