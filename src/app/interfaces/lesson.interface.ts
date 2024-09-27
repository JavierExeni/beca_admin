import { Topic } from './topic.interface';
import { Client } from './user.interface';

export type Lesson = {
  id: number;
  title: string;
  description: string;
  order: number;
  youtube_code: string;
  topic: Topic;
  viewed: Client[];
  is_viewed?: boolean;
};

export type LessonRequest = Omit<Lesson, 'id'> & {
  topic_id: number;
  viewed_id?: number[];
};
