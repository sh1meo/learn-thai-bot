import {
  Column,
  Model,
  Table,
  PrimaryKey,
  NotEmpty,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ modelName: 'words', timestamps: false })
export class Words extends Model {
  @PrimaryKey
  @NotEmpty
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @NotEmpty
  @Column(DataType.STRING)
  word: string;

  @NotEmpty
  @Column(DataType.STRING)
  transcription: string;

  @NotEmpty
  @Column(DataType.STRING)
  translate: string;

  @NotEmpty
  @Column(DataType.INTEGER)
  level: number;
}
