
const cryptoJS = require('crypto-js')

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'me1234',
  port: 5432
})

const getRecords = (request, response) => {
  pool.query('SELECT * FROM records ORDER BY points DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserRecords = (request, response) => {
  const name = request.params.name
  console.log(name)

  pool.query("SELECT * FROM records WHERE name = $1", [name], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const saveRecord = (request, response) => {
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

const createUser = async (req, res) => {
  const { nick, password } = req.body

  const salt = cryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashedPassw = cryptoJS.AES.encrypt(password, salt)
  
  pool.query('INSERT INTO users (nick, password, salt) VALUES ($1, $2, $3) RETURNING *', [nick, hashedPassw.toString(), salt]), 
    (error, results) => {
      if (error) {
        throw error
      }

      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
}

const login = (req, res) => {
  const { nick, password } = req.params

  pool.query('SELECT password, salt FROM users where nick = $1', [nick], (error, result) => {
    if (error) {
      throw error;
    }

    const encryptedPassw = result.rows[0].password
    const salt = result.rows[0].salt
    const decryptedPassw = cryptoJS.AES.decrypt(encryptedPassw, salt)

    if (password == decryptedPassw.toString(cryptoJS.enc.Utf8)) {
      res.status(200).json("Senha correta")
    } else {
      res.status(200).json("Senha incorreta")
    }
  });
}


module.exports = {
  getRecords,
  getUserRecords,
  saveRecord,
  createUser,
  login
};
