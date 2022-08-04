const router = require('express').Router();
const { getTalkersList, writeTalkersList } = require('../services/handleFs');
const {
  checkToken,
  checkName,
  checkAge,
  checkTalkWatchedAt,
  checkTalkRate,
} = require('../middlewares/validateTalker');

router.get('/', async (_req, res) => {
  const talkers = await getTalkersList();
  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkersList();
  const talkerId = talkers.find((tlk) => tlk.id === Number(id));
  
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talkerId);
});

router.post('/',
checkToken,
checkName,
checkAge,
checkTalkWatchedAt,
checkTalkRate,
async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await getTalkersList();
  const id = talkers.length + 1;
  const newTalker = { id, name, age, talk };

  talkers.push(newTalker);
  await writeTalkersList(talkers);

  res.status(201).json(newTalker);
});

module.exports = router;