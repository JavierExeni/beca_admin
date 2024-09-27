import { Course } from "./course.interface";
import { Lesson } from "./lesson.interface";

export type Topic = {
  id: number;
  title: string;
  order: number;
  lessons?: Lesson[];
  course: Course;
};

export type TopicRequest = Omit<Topic, 'id' | 'course'> & {
  course_id: number;
};
