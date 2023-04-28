import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  alreadyHasChallengeMessage,
  incorrectAnswerMessage,
} from 'src/utils/constants';
import { ChallengesService } from '../challenges/challenges.service';
import {
  IMessage,
  Message,
  MessageType,
  ReturningMessage,
} from '../types/message.types';
import { isChallengeType, ChallengeType } from '../types/challenge.types';
import { Messages } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages)
    private readonly messagesModel: typeof Messages,
    private readonly challengesService: ChallengesService,
  ) {}

  public async makeChallengeHandler(
    action: ChallengeType,
    userId: number,
  ): Promise<ReturningMessage> {
    let messageForReturn: ReturningMessage;

    const messageForCreate: {
      text: ChallengeType;
      type: MessageType;
      user_id: typeof userId;
      challenge_id?: string;
    } = {
      text: action,
      type: MessageType['action'],
      user_id: userId,
    };

    if (isChallengeType(action)) {
      const challenge = await this.challengesService.makeChallenge({
        type: action,
        count: 5,
        userId,
      });
      // console.log(challenge);
      messageForCreate.challenge_id = challenge.guid;
    } else console.log('wtf');
    await this.createMessage({ ...messageForCreate });
    return (messageForReturn = { text: 'Временный ответ' });
  }

  public async messageHanler(
    message: string,
    userId: number,
  ): Promise<ReturningMessage> {
    let messageForReturn: ReturningMessage;
    const lastUsersMessage = await this.getLastUsersMessage(userId);
    if (isChallengeType(message)) {
      if (!lastUsersMessage.challenge_id)
        return await this.makeChallengeHandler(message, userId);
      if (lastUsersMessage.challenge_id) {
        messageForReturn = alreadyHasChallengeMessage;
      }
    } else if (lastUsersMessage.challenge_id) {
      console.log('lets check challenge message');
      const { correct: isAnswerCorrect, lastTry: isLastQuestion } =
        await this.challengesService.checkAnswer(
          message,
          lastUsersMessage.challenge_id,
        );
      if (!isAnswerCorrect) {
        messageForReturn = incorrectAnswerMessage;
      }
      messageForReturn;
    }

    return messageForReturn;
  }

  private async createMessage(message: IMessage) {
    const createdMessage = await this.messagesModel.create({ ...message });
    return createdMessage;
  }

  private async getLastUsersMessage(userId: number): Promise<Message> {
    const message = await this.messagesModel.findOne({
      where: { user_id: userId },
      order: ['createdAt', 'desc'],
    });
    return message;
  }
}
