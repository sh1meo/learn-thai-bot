import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Words } from '../words/words.model';
import { WordsService } from '../words/words.service';
import { Challenges } from './challenges.model';
import { ChallengesService } from './challenges.service';
import {
  challengeMiddlePosition,
  challengeWithLastPosition,
} from './challenges.fixtires';

describe('ChallelgesService', () => {
  let service: ChallengesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengesService,
        WordsService,
        { provide: getModelToken(Challenges), useValue: {} },
        { provide: getModelToken(Words), useValue: {} },
      ],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkAnswer', () => {
    beforeAll(() => {
      jest
        .spyOn(ChallengesService.prototype as any, 'saveChallengeObjectInDb')
        .mockImplementation(() => 'ok');
    });

    describe('the last question in array', () => {
      beforeAll(() => {
        jest
          .spyOn(ChallengesService.prototype as any, 'findOne')
          .mockImplementation(() => {
            return challengeWithLastPosition;
          });
      });

      it('should return { correct: true, lastTry: true } if answer is correct', async () => {
        expect(await service.checkAnswer('палочки для еды', 'guid')).toEqual({
          correct: true,
          lastTry: true,
        });
      });

      it('should return { correct: false, lastTry: false } if answer is incorrect and try is first', async () => {
        //тут первый трай должен быть, но из-за теста выше он обновляется на второй, скидываем ручками
        delete challengeWithLastPosition.challenge[
          challengeWithLastPosition.question_position
        ].try;
        expect(await service.checkAnswer('incorrect answer', 'guid')).toEqual({
          correct: false,
          lastTry: false,
        });
      });

      it('should return { correct: false, lastTry: true } if nswer is incorrect and try is second', async () => {
        challengeWithLastPosition.challenge[
          challengeWithLastPosition.question_position
        ].try = 1;
        expect(await service.checkAnswer('incorrect answer', 'guid')).toEqual({
          correct: false,
          lastTry: true,
        });
      });
    });

    describe('not the last question in array', () => {
      beforeAll(() => {
        jest
          .spyOn(ChallengesService.prototype as any, 'findOne')
          .mockImplementation(() => {
            return challengeMiddlePosition;
          });
      });

      it('should return { correct: false, lastTry: true } if unswer is incorrect and try is last', async () => {
        delete challengeMiddlePosition.challenge[
          challengeMiddlePosition.question_position
        ].try;
        expect(await service.checkAnswer('incorrect answer', 'guid')).toEqual({
          correct: false,
          lastTry: false,
        });
      });

      it('should return { correct: false, lastTry: false } if unswer is correct and try is first', async () => {
        delete challengeMiddlePosition.challenge[
          challengeMiddlePosition.question_position
        ].try;
        expect(await service.checkAnswer('стакан', 'guid')).toEqual({
          correct: true,
          lastTry: false,
        });
      });

      it('should return { correct: true, lastTry: true } if unswer is correct and try is last', async () => {
        challengeMiddlePosition.challenge[
          challengeMiddlePosition.question_position
        ].try = 1;
        expect(await service.checkAnswer('стакан', 'guid')).toEqual({
          correct: true,
          lastTry: true,
        });
      });

      it('should return { correct: true, lastTry: false } if unswer is correct and try is first', async () => {
        delete challengeMiddlePosition.challenge[
          challengeMiddlePosition.question_position
        ].try;
        expect(await service.checkAnswer('стакан', 'guid')).toEqual({
          correct: true,
          lastTry: false,
        });
      });
    });
  });
});
