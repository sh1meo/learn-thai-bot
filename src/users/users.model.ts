import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Challenges } from '../challenges/challenges.model';

@Table({ modelName: 'users' })
export class Users extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  username: string;

  @ForeignKey(() => Challenges)
  @Column(DataType.INTEGER)
  last_challenge_id: number;
}
