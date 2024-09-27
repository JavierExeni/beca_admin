import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';

import { Course } from '../../../interfaces';
import { map, Observable, tap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { LessonListComponent } from '../../components/lesson-list/lesson-list.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    FieldsetModule,
    RouterLink,
    LessonListComponent,
    BreadcrumbModule,
    NgClass,
  ],
  templateUrl: './course-detail.component.html',
  styles: ``,
})
export class CourseDetailComponent {
  activatedRoute = inject(ActivatedRoute);

  items: MenuItem[] = [{ icon: 'fa-solid fa-house', route: '/' }];

  course$: Observable<Course> = this.activatedRoute.data.pipe(
    tap(({ course }) => {
      this.items.push(
        { label: 'Cursos', route: `/public/cursos/` },
        { label: `Grado ${course.level.name} - ${course.title}` }
      );
    }),
    map(({ course }) => course)
  );
}
