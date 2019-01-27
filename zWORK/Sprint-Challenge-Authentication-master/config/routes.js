const axios = require('axios');

const { authenticate } = require('../auth/authenticate');

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
  const creds = req.body;
  db.findByUsername(creds.username)
  .then(user => {
      // username valid   hash from client == hash from db
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      // redirect
      res.json({ id: user.id, token });
    } else {
      // we send back info that allows the front end 
      // to display a new error message
      res.status(404).json({err: "invalid username or password"});
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
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
