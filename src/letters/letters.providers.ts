import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Letters } from './models/consonants.model';
import { Vowels } from './models/vowels.model';

@Injectable()
export class LettersProvider {
  constructor(
    @InjectModel(Letters)
    private consonantModel: typeof Letters,
    @InjectModel(Vowels)
    private vowelsModel: typeof Vowels,
  ) {}
}
