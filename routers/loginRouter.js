const express = require('express');
const generateToken = require('../services/generateToken');
// const { checkExistEmailPassword } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;
