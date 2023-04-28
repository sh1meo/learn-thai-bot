import { Body, Controller, Post } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsServise: WordsService) {}

  @Post()
  async create(@Body() createWordDto: CreateWordDto) {
    return await this.wordsServise.create(createWordDto);
  }
}
