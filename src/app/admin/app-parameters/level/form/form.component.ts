import { NgIf } from '@angular/common';
import { Component, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { LevelService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';
import { Level, LevelRequest } from '../../../../interfaces';

@Component({
  selector: 'app-level-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class LevelFormComponent {
  fb = inject(FormBuilder);
  levelService = inject(LevelService);
  toastService = inject(ToastService);

  public selectedItem = input<Level>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  get hasProfile(): boolean {
    return this.form.get('svg_flag')!.value == '' ||
      this.form.get('svg_flag')!.value == null
      ? false
      : true;
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      this.form.patchValue({
        name: this.selectedItem()!.name,
        description: this.selectedItem()!.description,
      });
    }
  }

  onSubmit() {
    const data = this.form.getRawValue() as any;
    if (this.isEdit()) {
      if (typeof data.svg_flag == 'string') {
        delete data.svg_flag;
      }
      this.onUpdate(data);
      return;
    }
    this.onCreate(data);
  }

  onCreate(data: LevelRequest) {
    this.levelService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Nivel creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Nivel.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.levelService.loadLevels(),
    });
  }

  onUpdate(data: LevelRequest) {
    this.levelService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Nivel actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Nivel.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.levelService.loadLevels(),
    });
  }
}
