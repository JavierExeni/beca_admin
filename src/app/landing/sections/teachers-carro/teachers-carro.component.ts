import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-teachers-carro',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './teachers-carro.component.html',
  styles: ``,
})
export class TeachersCarroComponent {

  teachers = [
    {
      title: 'La mejor elección para aprender un nuevo idioma!!',
      full_name: 'Daniel Fernandez',
      occupation: 'Estudiante de inglés en Becademia',
      image: 'images/student1.jpg'
    },
    {
      title: 'La mejor elección para aprender un nuevo idioma!!',
      full_name: 'Daniel Fernandez',
      occupation: 'Estudiante de inglés en Becademia',
      image: 'images/student2.jpg'
    },
    {
      title: 'La mejor elección para aprender un nuevo idioma!!',
      full_name: 'Daniel Fernandez',
      occupation: 'Estudiante de inglés en Becademia',
      image: 'images/student3.jpg'
    },
  ]

  responsiveOptions: any[] | undefined = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
