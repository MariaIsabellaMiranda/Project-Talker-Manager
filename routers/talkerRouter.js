const express = require('express');
const rescue = require('express-rescue');
const { getTalkersList } = require('../services/handleFs');
const { verifyId } = require('../middlewares/ errorMiddleware');

const app = express();
const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  const talkers = await getTalkersList();
  return res.status(200).json(talkers);
}));

// app.use(readTalkersListError);

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkersList();
  const talkerId = talkers.find((tlk) => tlk.id === Number(id));
  return res.status(200).json(talkerId);
}));

app.use(verifyId);

module.exports = router;