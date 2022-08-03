const fs = require('fs').promises;

const TALKERSLIST = './talker.json';

const getTalkersList = async () => {
  try {
  const data = await fs.readFile(TALKERSLIST, 'utf-8');
  return JSON.parse(data);
  } catch (err) {
    console.error(`Ǹão foi possível ler o arquivo. ${err}`);
  }
};

module.exports = { getTalkersList };