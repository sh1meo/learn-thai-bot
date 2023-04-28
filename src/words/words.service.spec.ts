import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';
import { Words } from './words.model';
import fixtures from '../utils/testFixtures';
import { dbconfig } from '../../config/database.config';

describe('WordsService', () => {
  let wordsService: WordsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          ...dbconfig,
          dialect: 'postgres',
          models: [Words],
          autoLoadModels: true,
        }),
        SequelizeModule.forFeature([Words]),
      ],
      providers: [WordsService],
    }).compile();
    wordsService = module.get<WordsService>(WordsService);
    for (let i = 0; i < fixtures.words.length; i++) {
      const word = fixtures.words[i];
      await Words.create(word);
    }
  });

  describe('getWordsCount', () => {
    it('must return 8', async () => {
      expect(await wordsService.getWordsCount()).toBe(8);
    });
  });

  afterAll(async () => {
    await Words.drop();
  });
});
