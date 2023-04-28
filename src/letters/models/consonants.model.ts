import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  NotEmpty,
} from 'sequelize-typescript';
import { ConsonantClass } from 'src/types/letter.types';

@Table({ modelName: 'letters', timestamps: false })
export class Letters extends Model {
  @PrimaryKey
  @NotEmpty
  @Column(DataType.INTEGER)
  position: number;

  @NotEmpty
  @Column(DataType.STRING)
  letter: string;

  @NotEmpty
  @Column(DataType.STRING)
  transription: string;

  @NotEmpty
  @Column(DataType.STRING)
  associative_word: string;

  @NotEmpty
  @Column(DataType.STRING)
  associative_word_transcription: string;

  @NotEmpty
  @Column(DataType.STRING)
  associative_word_translate: string;

  // @NotEmpty
  // @Column(DataType.STRING)
  // class: ConsonantClass;
}
