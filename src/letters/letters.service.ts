import { Injectable } from '@nestjs/common';
import { LettersProvider } from './letters.providers';

@Injectable()
export class LettersService {
  constructor(private readonly lettersProvider: LettersProvider) {}
}
