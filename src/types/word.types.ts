export type WordsAttributes = 'transcription' | 'translate' | 'level' | 'word';

export enum WordLevel {
  'beginner' = 1,
  'medium',
  'high',
}

export type Word = {
  trancription?: string;
  translate?: string;
  word: string;
};
