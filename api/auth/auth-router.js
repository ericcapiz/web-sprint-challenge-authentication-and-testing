const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const db = require('../../data/dbConfig.js');
const generateToken = require('./generateToken.js');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) return res.status(400).json({ error: 'Please provide username and password' });

  const hash = bcryptjs.hashSync(password, process.env.HASH_ROUNDS || 8);

  try {
    await db('users').insert({ username, password: hash })
    const user = await db('users').where({ username }).first();
    res.status(201).json(user);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Cannot add user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Please provide username and password' });

  try {
    const user = await db('users').where({ username }).first();
    if(user && bcryptjs.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ error: 'Password is incorrect' });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Cannot find user" });
  }
});


module.exports = router;