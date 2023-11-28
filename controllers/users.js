
module.exports = (app) => ({ signIn, signUp })

const cryptoJS = require('crypto-js')
const {pool} = require("../index.js")

async function signUp(req, res) {
  const { nick, password } = req.body

  const salt = cryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashedPassw = cryptoJS.AES.encrypt(password, salt)
  
  pool.query('INSERT INTO users (nick, password, salt) VALUES ($1, $2, $3) RETURNING *', [nick, hashedPassw.toString(), salt]), 
    (error, results) => {
      if (error) {
        throw error
      }

      res.status(201).send(`User adicionado com sucesso`)
    }
}

function signIn(req, res) {
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
