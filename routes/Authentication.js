const Authentication = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { encryptPassword, decryptedPassword } = require('../Utils/passwords');

// Register

Authentication.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new User({
    username,
    email,
    password: encryptPassword(password),
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).send(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

Authentication.post('/login', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await User.findOne({ username });
    !user && res.status(401).json('Wrong credentials!');

    const userPassword = decryptPassword(user.password);

    userPassword !== password && res.status(401).json('Wrong credentials!');
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = Authentication;
