import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Messages } from './messages.model';
import { MessagesService } from './messages.service';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [SequelizeModule.forFeature([Messages]), ChallengesModule],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
