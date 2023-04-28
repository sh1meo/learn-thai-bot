// // const { ChallengesService } = require('./challenges/challenges.service');
import { Words } from './words/words.model';
import { WordsService } from './words/words.service';

export const wordsService = new WordsService(Words);
// dialect: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '124578',
//       database: 'thai-learning',
//       models: [Words, Letters, Users],
//       synchronize: true,
//       autoLoadModels: true,
//     })

// (async () => {
//   // const res = await ChallengesService.makeChallenge('words', 4);
//   const count = await wordsService.getWordsCount();
//   console.log(count);
// })();
