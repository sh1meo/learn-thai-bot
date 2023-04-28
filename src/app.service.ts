import { Injectable } from '@nestjs/common';
import { ChallengesService } from './challenges/challenges.service';

@Injectable()
export class AppService {
  constructor(private challengesService: ChallengesService) {}
  // public handler(message): void {
  //   const chatId = message.chat.id;
  //   this.telegram.sendMessage({ text: 'Its ok', chat_id: chatId });
  // }
}
