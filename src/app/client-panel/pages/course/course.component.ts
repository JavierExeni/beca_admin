import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { CourseService } from '../../../admin/services/course.service';
import { GetResourceFromBackendPipe } from '../../../shared/pipes/get-resource-from-backende.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    NgFor,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    GetResourceFromBackendPipe,
    RouterLink
  ],
  templateUrl: './course.component.html',
  styles: ``,
})
export class CourseComponent implements OnInit {
  courseService = inject(CourseService);

  ngOnInit(): void {
    this.courseService.loadClientCourses();
  }
}
