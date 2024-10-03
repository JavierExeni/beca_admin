import { Component } from '@angular/core';
import { ItemGridComponent } from './item-grid/item-grid.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [ItemGridComponent],
  templateUrl: './course-list.component.html',
  styles: ``,
})
export class CourseListComponent {
  items = [
    {
      title: 'Clases de inglés',
      subtitle: '20.000 Profesores',
      route: '/',
    },
    {
      title: 'Clases de español',
      subtitle: '8768 Profesores',
      route: '/',
    },
    {
      title: 'Clases de francés',
      subtitle: '2810 Profesores',
      route: '/',
    },
    {
      title: 'Clases de alemán',
      subtitle: '1030 Profesores',
      route: '/',
    },
    {
      title: 'Clases de italiano',
      subtitle: '2057 Profesores',
      route: '/',
    },
    {
      title: 'Clases de chino',
      subtitle: '4474 Profesores',
      route: '/',
    },
    {
      title: 'Clases de árabe',
      subtitle: '2752 Profesores',
      route: '/',
    },
    {
      title: 'Clases de japonés',
      subtitle: '2062 Profesores',
      route: '/',
    },
    {
      title: 'Clases de portugués',
      subtitle: '1224 Profesores',
      route: '/',
    },
  ];
}
