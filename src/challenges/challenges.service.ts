import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { makeWordsArrayForChallenge } from '../utils/makeArrayForChallenge';
import { WordsAttributes } from '../types/word.types';
import {
  ChallengeAttribute,
  ChallengeObject,
  IChallenge,
} from '../types/challenge.types';
import { WordsService } from '../words/words.service';
// import { randomizeNumber } from '../utils/randomizeNumber';
import { Challenges } from './challenges.model';
import { CreateChallengeDto } from './make-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenges)
    private challengesModel: typeof Challenges,
    private readonly wordsServise: WordsService,
  ) {}

  public async makeChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<{ firstQuestion: ChallengeObject; guid: string }> {
    // level пока не используется, но в планах
    const { count, type, level, userId } = createChallengeDto;
    let attributes: WordsAttributes[];
    let challenge: ChallengeObject[];
    console.log(type);

    if (type === 'words') {
      attributes = ['word', 'translate'];
      challenge = await this.makeWordsChallenge(count, attributes);
      console.log(`makeChallenge res =`, challenge);
    }

    if (type === 'vowels') {
      attributes = ['word', 'translate'];
      challenge = await this.makeWordsChallenge(count, attributes);
      console.log(`makeChallenge res =`, challenge);
    }

    if (type === 'diphtongs') {
      attributes = ['word', 'translate'];
      challenge = await this.makeWordsChallenge(count, attributes);
      console.log(`makeChallenge res =`, challenge);
    }

    if (type === 'alphabet') {
      attributes = ['word', 'translate'];
      challenge = await this.makeWordsChallenge(count, attributes);
      console.log(`makeChallenge res =`, challenge);
    }

    const record = await this.challengesModel.create({
      user_id: userId,
      challenge,
    });
    return { firstQuestion: record.challenge[0], guid: record.guid };
  }

  public async getLastUsersChallenge() {
    console.log('last challenge');
  }

  public async checkAnswer(
    message: string,
    challengeId: string,
  ): Promise<{ correct: boolean; lastTry: boolean }> {
    const challenge = await this.findOne({ guid: challengeId }, [
      'challenge',
      'completed',
      'question_position',
    ]);

    let questionPosition = challenge.question_position;
    const question = challenge.challenge[questionPosition];
    question?.try === 1 ? (question.try = 2) : (question.try = 1);

    let questionChecked: { correct: boolean; lastTry: boolean };
    const isAnswerCorrect = message === question.answer;
    const isLastQuestion = questionPosition === challenge.challenge.length - 1;

    if (!isAnswerCorrect) {
      // значит это вторая попытка, больше нет, в question.try выше записали 2
      if (question.try === 2) {
        challenge.completed = isLastQuestion;
        question.correct = false;
        if (!isLastQuestion) questionPosition += 1;
        questionChecked = { correct: false, lastTry: true };
      } else {
        // тут в question.correct пока ничего не пишем, т.к. результат не финальный
        questionChecked = { correct: false, lastTry: false };
      }
    } else if (isAnswerCorrect) {
      challenge.completed = isLastQuestion;
      if (!isLastQuestion) questionPosition += 1;
      question.correct = true;
      questionChecked = {
        correct: true,
        lastTry: isLastQuestion
          ? isLastQuestion
          : question.try === 2
          ? true
          : false,
      };
    }
    await this.saveChallengeObjectInDb(challenge);
    console.log(question.try);
    return questionChecked;
  }

  /* Подготавливает объект для последующего создания челленджа с переводом слов */
  private async makeWordsChallenge(
    amount: number,
    attributes: WordsAttributes[],
  ): Promise<ChallengeObject[]> {
    const words = await this.wordsServise.getSomeRandomWords(
      amount,
      attributes,
    );
    console.log('makeWordsChallenge res = ', words);
    return makeWordsArrayForChallenge(words);
  }

  private async makeVowelsChallenge() {

   }

  private async makeDiphtongsChallenge() { }

  private async makeAlphabetChallenge() { }

  private async findOne(
    where: WhereOptions,
    attributes: ChallengeAttribute[],
  ): Promise<Challenges> {
    const challenge = await this.challengesModel.findOne({ where, attributes });
    return challenge;
  }

  private async saveChallengeObjectInDb(
    object: Challenges,
  ): Promise<IChallenge> {
    const upatedChallenge = await object.save();
    return upatedChallenge;
  }
}
