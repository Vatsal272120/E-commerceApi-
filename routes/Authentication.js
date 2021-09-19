const Authentication = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { encryptPassword, decryptedPassword } = require('../Utils/passwords');

// Register

Authentication.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
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

    const userPassword = decryptedPassword(user.password);

    userPassword !== req.body.password &&
      res.status(401).json('Wrong credentials!');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isUserAdmin: user.isUserAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.error(err);
  }
});

module.exports = Authentication;
