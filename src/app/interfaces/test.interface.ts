import { Course } from './course.interface';
import { Question } from './question.interface';
import { Client } from './user.interface';

export type Test = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  passingScorePercentage: number;
  clients_taken: Client[];
  course?: Course;
  questions?: Question[]
};

export type TestRequest = Omit<Test, 'id' | 'clients_taken'> & {
  clients_taken_id: number[];
};
