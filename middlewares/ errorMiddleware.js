// const readTalkersListError = (err, _req, res, _next) => (
//   res.status(500)
//   .json({ error: `Erro: ${err.message}` })
// );

const verifyId = (err, _req, res, _next) => {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = { verifyId };