import { IsNumber, IsString } from 'class-validator';
import { ChallengeType } from '../types/challenge.types';
import { WordLevel } from '../types/word.types';

export class CreateChallengeDto {
  // количество вопросов, с которым создаётся челлендж
  @IsNumber()
  count: number;

  @IsString()
  type: ChallengeType;

  // в планах прикрутить к словам сложность и создавать челленджи со словами нужной сложности
  @IsString()
  level?: WordLevel;

  @IsString()
  userId: number;
}
