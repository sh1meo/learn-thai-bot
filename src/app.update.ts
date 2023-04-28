import { Update, Ctx, Start, Help, On, Hears, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { ChallengesService } from './challenges/challenges.service';
import { MessagesService } from './messages/messages.service';
import { chooseLearningActionMessage } from './utils/constants';
import { WordsService } from './words/words.service';
import { fillConsonants } from './utils/scripts/fillConsonants';

@Update()
export class AppUpdate {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly wordsService: WordsService,
    private readonly messagesService: MessagesService,
  ) {}
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @Hears('learn')
  async hears(@Ctx() ctx: Context) {
    await ctx.sendMessage(chooseLearningActionMessage);
  }

  @Hears('debug')
  async debug(@Ctx() ctx: Context) {
    fillConsonants();
  }

  @Action(['vowels', 'words', 'alphabet', 'diphtongs'])
  async makeChallengeHandler(ctx: any) {
    // todo: найти откуда импортировать интерфейс ctx, он вроде есть где-то в либе
    // update: нашёл, но не разобрался как достать callbackQuery.data
    const messageForSend = await this.messagesService.makeChallengeHandler(
      ctx.callbackQuery.data, // текст из кнопки
      ctx.callbackQuery.from.id, // ид юзера
    );
    messageForSend.reply_markup
      ? ctx.sendMessage(messageForSend.text, {
          reply_markup: messageForSend.reply_markup,
        })
      : ctx.sendMessage(messageForSend.text);
  }

  @Action(['has_challenge-continue', 'has_challenge-restart'])
  async hasChallengeHandler(ctx: any) {
    ctx.answerCbQuery('ok words');
  }

  @On('message')
  async on(@Ctx() ctx: Context) {
    console.log(ctx);
  }

  // @Action('dog')
  // async reply(@Ctx() ctx: any) {
  //   await ctx.sendMessage('its a dog');
  // }
}
