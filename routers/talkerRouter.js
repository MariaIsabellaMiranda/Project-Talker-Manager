const router = require('express').Router();
const { getTalkersList, writeTalkersList } = require('../services/handleFs');
const {
  checkToken,
  checkName,
  checkAge,
  checkTalkWatchedAt,
  checkTalkRate,
  checkSearchTerm,
} = require('../middlewares/validateTalker');

router.get('/search', checkToken, checkSearchTerm, async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkersList();

  const filteredTalkers = talkers.filter((tlk) => tlk.name.includes(q));

  return res.status(200).json(filteredTalkers);
});

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

router.put('/:id',
checkToken,
checkName,
checkAge,
checkTalkWatchedAt,
checkTalkRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkersList();

  const talkerIndex = talkers.findIndex((tlk) => tlk.id === Number(id));
  
  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await writeTalkersList(talkers);

  return res.status(200).json(talkers[talkerIndex]);
});

router.delete('/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkersList();

  const talkerIndex = talkers.findIndex((tlk) => tlk.id === Number(id));
  
  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  talkers.splice(talkerIndex, 1);
  await writeTalkersList(talkers);

  return res.status(204).end();
});

module.exports = router;