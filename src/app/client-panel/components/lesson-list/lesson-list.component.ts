import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { Course, Lesson } from '../../../interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [RouterLink, AccordionModule, ButtonModule, NgClass],
  templateUrl: './lesson-list.component.html',
  styles: ``,
})
export class LessonListComponent {
  data = input.required<{ course: Course }>();
}
