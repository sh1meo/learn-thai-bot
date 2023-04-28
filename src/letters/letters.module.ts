import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LettersService } from './letters.service';
import { Letters } from './models/consonants.model';
import { LettersProvider } from './letters.providers';

@Module({
  imports: [SequelizeModule.forFeature([Letters])],
  providers: [LettersService, LettersProvider],
  exports: [LettersService, LettersProvider],
})
export class AlphabetModule {}
