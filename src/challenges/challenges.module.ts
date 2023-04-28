import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WordsModule } from '../words/words.module';
import { Challenges } from './challenges.model';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [SequelizeModule.forFeature([Challenges]), WordsModule],
  providers: [ChallengesService],
  exports: [ChallengesService],
})
export class ChallengesModule {}
