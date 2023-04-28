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
import { Challenges } from '../challenges/challenges.model';
import { Users } from '../users/users.model';

@Table({ modelName: 'messages' })
export class Messages extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  guid: string;

  @NotEmpty
  @Column(DataType.STRING)
  text: string;

  @NotEmpty
  @Column(DataType.INTEGER)
  type: number;

  @ForeignKey(() => Users)
  @NotEmpty
  @Column(DataType.INTEGER)
  user_id: number;

  @ForeignKey(() => Challenges)
  @Column(DataType.STRING)
  challenge_id: string;
}
