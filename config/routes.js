const axios = require('axios');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const bcrypt = require('bcryptjs')
const { authenticate } = require('../auth/authenticate');
const db = knex(knexConfig.development);
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  console.log("POST register is running")
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 16);
  db('auth').insert(user)
    .then(ids => {
      res.status(201).json({ id: ids[0] });
    })
    .catch(err => {
      res.status(500).send(err);
    })
console.log("POST register success!")
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
