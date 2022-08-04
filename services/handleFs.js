const fs = require('fs').promises;

const TALKERSLIST = './talker.json';

const getTalkersList = async () => {
  try {
  const data = await fs.readFile(TALKERSLIST, 'utf-8');
  return JSON.parse(data);
  } catch (err) {
    console.error(`Não foi possível ler o arquivo. ${err}`);
  }
};

const writeTalkersList = async (newTalker) => {
  try {
  await fs.writeFile(TALKERSLIST, JSON.stringify(newTalker));
  } catch (err) {
    console.error(`Ǹão foi possível escrever no arquivo. ${err}`);
  }
};

module.exports = { getTalkersList, writeTalkersList };