import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { WebinarService } from '../../../services/webinar.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Webinar, WebinarRequest } from '../../../../interfaces';

@Component({
  selector: 'app-webinar-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class WebinarFormComponent {
  fb = inject(FormBuilder);
  webinarService = inject(WebinarService);
  toastService = inject(ToastService);

  public selectedItem = input<Webinar>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    youtube_code: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      const data = this.selectedItem();
      this.form.patchValue({
        title: data!.title,
        description: data!.description,
        youtube_code: data!.youtube_code,
      });
    }
  }

  onSubmit() {
    const data = this.form.getRawValue() as any;
    if (this.isEdit()) {
      this.onUpdate(data);
      return;
    }
    this.onCreate(data);
  }

  onCreate(data: WebinarRequest) {
    this.webinarService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Webinar creada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear la Webinar.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.webinarService.loadWebinars(),
    });
  }

  onUpdate(data: WebinarRequest) {
    this.webinarService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Webinar actualizada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar la Webinar.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.webinarService.loadWebinars(),
    });
  }
}
