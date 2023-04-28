import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  NotEmpty,
  Default,
} from 'sequelize-typescript';
import { WordsAttributes } from 'src/types/word.types';
import { ChallengeObject } from '../types/challenge.types';
import { Users } from '../users/users.model';

@Table({ modelName: 'challenges' })
export class Challenges extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  guid: string;

  @ForeignKey(() => Users)
  @NotEmpty
  @Column(DataType.INTEGER)
  user_id: number;

  /* массив объектов с вопросами, состоит из вопроса, правильного ответа и флага правильности ответа юзера */
  @NotEmpty
  @Column(DataType.JSONB)
  challenge: ChallengeObject[];

  /* юзер может закончить челлендж досрочно, вызвав системную команду или тыкнув на кнопку
  если он это делает, челлендж помечается как не завершённый и мб не учитывается в статистику */
  @NotEmpty
  @Default(false)
  @Column(DataType.BOOLEAN)
  completed: boolean;

  /* курсор, указывающий на позицию текущего вопроса
   при создании челленджа значение устанавливается на 0, т.к. вопросы - массив объектов
   при получении сообщения после создания челленджа это сообщение проверяется
  по объекту челленджа на позиции из этого поля и счётчик инкрементируется */
  @Default(0)
  @Column(DataType.SMALLINT)
  question_position: number;

  // @Column(DataType.STRING)
  // @NotEmpty
  // type: WordsAttributes;
}
