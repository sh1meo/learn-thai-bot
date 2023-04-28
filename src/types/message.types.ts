export type Message = {
  guid: string;
  text: string;
  type: MessageType;
  challenge_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum MessageType {
  'message' = 1,
  'help',
  'start',
  'action',
}

export interface IMessage {
  text: string;
  type: MessageType;
  user_id: number;
  challenge_id?: string;
}

export type ReturningMessage = {
  text: string;
  reply_markup?: {
    inline_keyboard: { text: string; callback_data: string }[];
    resize_keyboard: boolean;
    input_field_placeholder: string;
  };
};
