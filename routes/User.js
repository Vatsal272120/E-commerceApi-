const UserRouter = require('express').Router();
const { error } = require('../misc');
const { findByIdAndUpdate } = require('../models/User');
const User = require('../models/User');
const {
  verifyToken,
  verifyTokenandAuthorize,
  verifyTokenforAdmin,
} = require('../Utils/jwtTokens');
const { encryptPassword } = require('../Utils/passwords');

// UPDATE
UserRouter.put('/:id', verifyTokenandAuthorize, async (req, res) => {
  const { password } = req.body;

  if (password) {
    encryptPassword(password);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updateUser);
  } catch (err) {
    return error;
  }
});

// GET ALL USER
