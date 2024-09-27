import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { LessonService, TopicService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';
import { Lesson, LessonRequest, Topic } from '../../../../interfaces';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class LessonFormComponent {
  topic = input.required<Topic>();
  fb = inject(FormBuilder);
  lessonService = inject(LessonService);
  topicService = inject(TopicService);
  toastService = inject(ToastService);

  public selectedItem = input<Lesson>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    order: ['', Validators.required],
    youtube_code: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      console.log(this.selectedItem());
      this.form.patchValue({
        title: this.selectedItem()!.title,
        description: this.selectedItem()!.description,
        youtube_code: this.selectedItem()!.youtube_code,
        order: this.selectedItem()!.order as any,
      });
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue() as any;
    const data = {
      ...formValue,
      topic: this.topic().id,
    };
    if (this.isEdit()) {
      this.onUpdate(data);
      return;
    }
    this.onCreate(data);
  }

  onCreate(data: LessonRequest) {
    this.lessonService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Lección creada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear la Lección.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.lessonService.loadlessonsByTopic(this.topic().id),
    });
  }

  onUpdate(data: LessonRequest) {
    this.lessonService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Lección actualizada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar la Lección.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.lessonService.loadlessonsByTopic(this.topic().id),
    });
  }
}
