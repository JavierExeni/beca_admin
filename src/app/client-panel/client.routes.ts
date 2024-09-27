import { Route } from '@angular/router';
import {
  CourseDetailResolver,
  EvaluationDetailResolver,
  EvaluationTestDetailResolver,
  LessonDetailResolver,
  TopicDetailResolver,
  WebinarDetailResolver,
} from '../shared/resolvers/public-resolvers.resolver';

export const CLIENT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      // {
      //   path: 'dashboard',
      //   loadComponent: () =>
      //     import('./pages/lesson-detail/dashboard/dashboard.component').then(
      //       (c) => c.DashboardComponent
      //     ),
      // },
      {
        path: 'becas',
        loadComponent: () =>
          import('./pages/beca/beca.component').then((c) => c.BecaComponent),
      },
      {
        path: 'cursos',
        loadComponent: () =>
          import('./pages/course/course.component').then(
            (c) => c.CourseComponent
          ),
      },
      {
        path: 'cursos/:id',
        loadComponent: () =>
          import('./pages/course-detail/course-detail.component').then(
            (c) => c.CourseDetailComponent
          ),
        resolve: {
          course: CourseDetailResolver,
        },
      },
      {
        path: 'cursos/:id/tema/:topicId/leccion/:lessonId',
        loadComponent: () =>
          import('./pages/lesson-detail/lesson-detail.component').then(
            (c) => c.LessonDetailComponent
          ),
        resolve: {
          course: CourseDetailResolver,
          lesson: LessonDetailResolver,
          topic: TopicDetailResolver,
        },
      },
      {
        path: 'evaluation/:id',
        loadComponent: () =>
          import('./pages/evaluation/evaluation.component').then(
            (c) => c.EvaluationComponent
          ),
        resolve: {
          test: EvaluationDetailResolver,
        },
      },
      {
        path: 'test/:id',
        loadComponent: () =>
          import('./pages/evaluation-detail/evaluation-detail.component').then(
            (c) => c.EvaluationDetailComponent
          ),
        resolve: {
          test: EvaluationTestDetailResolver,
        },
      },
      {
        path: 'webinars',
        loadComponent: () =>
          import('./pages/webinar/webinar.component').then(
            (c) => c.WebinarComponent
          ),
      },
      {
        path: 'webinars/:id',
        loadComponent: () =>
          import('./pages/webinar-detail/webinar-detail.component').then(
            (c) => c.WebinarDetailComponent
          ),
        resolve: {
          webinar: WebinarDetailResolver,
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];
