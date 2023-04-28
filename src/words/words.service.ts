import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Word, WordLevel, WordsAttributes } from '../types/word.types';
import { randomizeNumber } from '../utils/randomizeNumber';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Words } from './words.model';

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Words)
    private wordsModel: typeof Words,
  ) {}

  async create(createWordDto: CreateWordDto) {
    const { word, transcription, translate, level } = createWordDto;
    const createdWord = await this.wordsModel.create({
      word,
      transcription,
      translate,
      level: WordLevel[level],
    });
    return createdWord;
  }

  /* todo: дальше в планах прикрутить сложность слов, нужно будет аргументом сюда её добавить
  и возвращать количество слов с определённой сложностью */
  public async getWordsCount(): Promise<number> {
    return await this.wordsModel.count();
  }

  async getSomeRandomWords(
    amount: number,
    attributes: WordsAttributes[],
  ): Promise<Word[]> {
    const randomIds: number[] = [];
    for (let i = 0; i < amount; i++) {
      const wordsCount = await this.getWordsCount();
      let randomId: number;
      do {
        randomId = randomizeNumber(wordsCount);
      } while (
        (randomIds.includes(randomId) && randomId != 0) ||
        randomId === 0
      );
      randomIds.push(randomId);
    }
    console.log('getSomeRandomWords randomIds =', randomIds);
    const where: WhereOptions = { id: { [Op.in]: randomIds } };
    const words = this.findAllWithAttributes(attributes, where);
    return words;
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    console.log(updateWordDto);
    return `This action updates a #${id} word`;
  }

  async remove(id: number) {
    return `This action removes a #${id} word`;
  }

  async findAllWithAttributes(
    attributes: WordsAttributes[],
    where: WhereOptions,
  ): Promise<Word[]> {
    const words = await this.wordsModel.findAll({
      attributes,
      where,
      raw: true,
    });
    return words;
  }
}
