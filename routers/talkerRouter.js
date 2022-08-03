const express = require('express');
const rescue = require('express-rescue');
const { getTalkersList } = require('../services/handleFs');

// const app = express();
const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  const talkers = await getTalkersList();
  return res.status(200).json(talkers);
}));

// app.use(readTalkersListError);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkersList();
  const talkerId = talkers.find((tlk) => tlk.id === Number(id));
  
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(talkerId);
});

module.exports = router;