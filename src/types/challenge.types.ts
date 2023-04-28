export interface IChallenge {
  guid?: string;
  user_id?: number;
  challenge: ChallengeObject[];
  completed: boolean;
  question_position: number;
}

export type ChallengeObject = {
  question: string;
  answer: string;
  correct?: boolean;
  try?: 1 | 2;
};

export type ChallengeType = 'vowels' | 'words' | 'alphabet' | 'diphtongs';

export function isChallengeType(message: any): message is ChallengeType {
  const actionTypes = ['vowels', 'alphabet', 'diphtongs', 'words'];
  return actionTypes.includes(message) ? true : false;
}

export type ChallengeAttribute =
  | 'challenge'
  | 'completed'
  | 'question_position'
  | 'guid'
  | 'user_id'
  | 'challenge';
