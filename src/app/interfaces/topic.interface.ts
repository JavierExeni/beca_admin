import { Course } from "./course.interface";

export type Topic = {
  id: number;
  title: string;
  order: number;
  course: Course;
};

export type TopicRequest = Omit<Topic, 'id' | 'course'> & {
  course_id: number;
};
