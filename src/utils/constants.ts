const resize_keyboard = true;
const input_field_placeholder = 'Выберите вариант, нажав на кнопку';

export const chooseLearningActionMessage = {
  text: 'Выберите тему, которую хотите изучать',
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'words',
          callback_data: 'words',
        },
        {
          text: 'alphabet',
          callback_data: 'alphabet',
        },
      ],
      [
        {
          text: 'diphthongs',
          callback_data: 'diphtongs',
        },
        {
          text: 'vowels',
          callback_data: 'vowels',
        },
      ],
    ],
    resize_keyboard,
    input_field_placeholder,
  },
};

export const alreadyHasChallengeMessage = {
  text: 'Вы уже начали тест, хотите продолжить старый или начать новый?',
  reply_markup: {
    inline_keyboard: [
      { text: 'Продолжить', callback_data: 'has_challenge-continue' },
      { text: 'Начать новый', callback_data: 'has_challenge-restart' },
    ],
    resize_keyboard,
    input_field_placeholder,
  },
};

export const incorrectAnswerMessage = {
  text: 'Неверный ответ. Хотите попробовать ещё раз с вариантами ответов или продолжить тест?',
  reply_markup: {
    inline_keyboard: [
      {
        text: 'Попробовать ещё раз',
        callback_data: 'incorrect_answer-retry',
      },
      {
        text: 'Продолжить',
        callback_data: 'incorrect_answer-continue',
      },
    ],
    resize_keyboard,
    input_field_placeholder,
  },
};
