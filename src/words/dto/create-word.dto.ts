import { IsString } from 'class-validator';
import { WordLevel } from '../../types/word.types';

export class CreateWordDto {
  @IsString()
  word: string;

  @IsString()
  transcription: string;

  @IsString()
  translate: string;

  @IsString()
  level: WordLevel;
}
