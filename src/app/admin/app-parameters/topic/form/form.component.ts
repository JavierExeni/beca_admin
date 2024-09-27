import { Component, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

import { TopicService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';
import { Course, Topic, TopicRequest } from '../../../../interfaces';
import { CourseService } from '../../../services/course.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-topic-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class TopicFormComponent {
  course = input.required<Course>();
  fb = inject(FormBuilder);
  topicService = inject(TopicService);
  courseService = inject(CourseService);
  toastService = inject(ToastService);

  public selectedItem = input<Topic>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    title: ['', Validators.required],
    order: [0, Validators.required],
    course_id: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      this.form.patchValue({
        title: this.selectedItem()!.title,
        order: this.selectedItem()!.order,
        course_id: this.selectedItem()!.course.id as any,
      });
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue() as any;
    const data = {
      ...formValue,
      course: this.course().id,
    };
    if (this.isEdit()) {
      this.onUpdate(data);
      return;
    }
    this.onCreate(data);
  }

  onCreate(data: TopicRequest) {
    this.topicService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Tema creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Tema.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.topicService.loadTopicsByCourse(this.course().id),
    });
  }

  onUpdate(data: TopicRequest) {
    this.topicService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Tema actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Tema.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.topicService.loadTopicsByCourse(this.course().id),
    });
  }
}
