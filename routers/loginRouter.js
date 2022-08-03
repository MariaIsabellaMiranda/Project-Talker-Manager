const express = require('express');
const generateToken = require('../services/generateToken');
const { checkEmail, checkPassword } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', checkEmail, checkPassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;
