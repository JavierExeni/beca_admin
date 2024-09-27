import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Lesson, Topic } from '../../../interfaces';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ButtonModule } from 'primeng/button';
import { LessonListComponent } from '../../components/lesson-list/lesson-list.component';
import { CommentsBoxComponent } from '../../components/comments-box/comments-box.component';
import { LessonService } from '../../../admin/services';
import { CourseService } from '../../../admin/services/course.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    YouTubePlayerModule,
    ButtonModule,
    LessonListComponent,
    CommentsBoxComponent,
    BreadcrumbModule,
    NgClass,
  ],
  templateUrl: './lesson-detail.component.html',
  styles: ``,
})
export class LessonDetailComponent {
  activatedRoute = inject(ActivatedRoute);

  lessonService = inject(LessonService);
  courseService = inject(CourseService);

  items: MenuItem[] = [
    { icon: 'fa-solid fa-house', route: '/' },
    { label: 'Cursos', route: '/public/cursos' },
  ];

  data$: Observable<{ course: Course; lesson: Lesson; topic: Topic }> =
    this.activatedRoute.data.pipe(
      tap(({ course, lesson }) => {
        this.items.push(
          {
            label: `Grado ${course.level.name} - ${course.title}`,
            route: `/public/cursos/${course.id}`,
          },
          { label: lesson.title }
        );
      }),
      map(({ course, lesson, topic }) => ({ course, lesson, topic }))
    );

  videoClic(
    stateChange: YT.OnStateChangeEvent,
    lessonId: number,
    courseId: number
  ) {
    const youtubeState = stateChange.target.getPlayerState();
    if (youtubeState == YT.PlayerState.PLAYING) {
      this.enrollClient(courseId);
      this.lessonService
        .addView(lessonId)
        .pipe(switchMap(() => this.courseService.getSingleCourse(courseId)))
        .subscribe();
    }
  }

  enrollClient(id: number) {
    this.courseService.addClient(id).subscribe({
      next: (_) => {},
      error: (err) => console.log(err),
    });
  }
}
