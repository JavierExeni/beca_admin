import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Course, Lesson, Test, Topic, Webinar } from '../../interfaces';
import { inject } from '@angular/core';
import { WebinarService } from '../../admin/services/webinar.service';
import { CourseService } from '../../admin/services/course.service';
import { LessonService, TopicService } from '../../admin/services';
import { TestService } from '../../admin/services/test.service';

export const WebinarDetailResolver: ResolveFn<Webinar> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(WebinarService).getSingelWebinar(Number(id));
};

export const CourseDetailResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(CourseService).getSingleCourse(Number(id));
};

export const LessonDetailResolver: ResolveFn<Lesson> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('lessonId');
  return inject(LessonService).getSingleLesson(Number(id));
};

export const TopicDetailResolver: ResolveFn<Topic> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('topicId');
  return inject(TopicService).getSingleTopic(Number(id));
};

export const EvaluationDetailResolver: ResolveFn<Test> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(TestService).getRetrieve(Number(id));
};

export const EvaluationTestDetailResolver: ResolveFn<Test> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(TestService).getTest(Number(id));
};
