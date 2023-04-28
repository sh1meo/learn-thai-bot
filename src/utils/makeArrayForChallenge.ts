import { Word } from 'src/types/word.types';

type returningWord = {
  question: string;
  answer: string;
};

/* у челленджей должен быть одинаковый формат элементов, эта функция
  приводит разные варианты массивов элементов слов к единому типу  */
export function makeWordsArrayForChallenge(array: Word[]): returningWord[] {
  const resultArray = [];
  array.forEach((el) => {
    const newEl = {
      question: el.word,
      answer: el?.trancription ? el.trancription : el.translate,
    };
    resultArray.push(newEl);
  });
  return resultArray;
}
