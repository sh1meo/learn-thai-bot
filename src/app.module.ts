import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WordsModule } from './words/words.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { ChallengesModule } from './challenges/challenges.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { Challenges } from './challenges/challenges.model';
import { Users } from './users/users.model';
import { Letters } from './letters/models/consonants.model';
import { Words } from './words/words.model';
import { Messages } from './messages/messages.model';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppUpdate } from './app.update';
import { Vowels } from './letters/models/vowels.model';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { dbconfig } from '../config/database.config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [config],
    // }),
    WordsModule,
    ChallengesModule,
    UsersModule,
    MessagesModule,
    SequelizeModule.forRoot({
      // ...dbconfig,
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '124578',
      database: 'thai-learning',
      dialect: 'postgres',
      models: [Challenges, Words, Letters, Users, Messages, Vowels],
      autoLoadModels: true,
      synchronize: true,
    }),
    TelegrafModule.forRoot({
      token: '5857492021:AAGd4FHfuPcldGanSRczgRAEHFbJ9gPgtaY',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
