import { Client } from './user.interface';

export type Question = {
  id: number;
  clients_taken: Client[];
  instruction: string;
  order: number;
  question: string;
  resource: string;
  score: string;
  test: 1;
  type: 0;
  options: Option[];
};

export type QuestionRequest = Omit<Question, 'id' | 'clients_taken'> & {
  clients_taken_id: number[];
};

export type Option = {
  id: number;
  possible_answer: string;
  resource: string;
};


export type OptionRequest = Omit<Option, 'id' >
