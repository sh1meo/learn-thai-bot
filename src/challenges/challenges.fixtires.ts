import { IChallenge } from 'src/types/challenge.types';

export const challengeWithLastPosition: IChallenge = {
  challenge: [
    { answer: 'бутылка', question: 'ขวด' },
    { answer: 'нож', question: 'มีด' },
    { answer: 'стакан', question: 'แก้ว' },
    { answer: 'тарелка', question: 'จาน' },
    { answer: 'палочки для еды', question: 'ตะเกียบ' },
  ],
  completed: false,
  question_position: 4,
};

export const challengeMiddlePosition: IChallenge = {
  challenge: [
    { answer: 'бутылка', question: 'ขวด' },
    { answer: 'нож', question: 'มีด' },
    { answer: 'стакан', question: 'แก้ว' },
    { answer: 'тарелка', question: 'จาน' },
    { answer: 'палочки для еды', question: 'ตะเกียบ' },
  ],
  completed: false,
  question_position: 2,
};
