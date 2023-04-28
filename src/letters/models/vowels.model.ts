import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  NotEmpty,
  AutoIncrement,
} from 'sequelize-typescript';
import { VowelType } from 'src/types/letter.types';

@Table({ modelName: 'vowels', timestamps: false })
export class Vowels extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @NotEmpty
  @Column(DataType.STRING)
  letter: string;

  @NotEmpty
  @Column(DataType.STRING)
  transription: string;

  @NotEmpty
  @Column(DataType.STRING)
  type: VowelType;

  @NotEmpty
  @Column(DataType.BOOLEAN)
  is_diphtong: boolean;
}
