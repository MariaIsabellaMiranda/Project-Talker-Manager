const checkExistEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json({ message: 'missing fields' });

  next();
};

module.exports = { checkExistEmailPassword };