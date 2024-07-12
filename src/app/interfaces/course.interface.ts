import { Client, Language, Level, Teacher, Test } from '.';


export type Course = {
  id: number;
  title: string;
  time_duration: number;
  is_active: boolean;
  clients_enrolled: Client[];
  profesor_owned: Teacher[];
  test: Test;
  level: Level;
  language: Language;
  created_by: Teacher;
};

export type CourseRequest = Omit<Course, 'id' | 'test' | 'level' | 'language' | 'created_by'> & {
  test_id: number;
  level_id: number;
  language_id: number;
  created_by_id: number;
  clients_enrolled_id: number[];
  profesor_owned_id: number[];
};
