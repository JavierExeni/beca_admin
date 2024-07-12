import { NgIf } from '@angular/common';
import { Component, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';

import { ToastService } from '../../../../shared/services/toast.service';
import { LanguageService } from '../../../services';
import { Language, LanguageRequest } from '../../../../interfaces';

@Component({
  selector: 'app-language-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class LanguageFormComponent {
  fb = inject(FormBuilder);
  languageService = inject(LanguageService);
  toastService = inject(ToastService);

  public selectedItem = input<Language>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    svg_flag: ['', Validators.required],
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
        code: this.selectedItem()!.code,
        svg_flag: this.selectedItem()!.svg_flag,
      });
    }
  }

  saveDocument(event: any) {
    for (let file of event.files) {
      this.form.get('svg_flag')?.setValue(file);
    }
  }

  deleteDocument(fileUpload: any) {
    this.form.get('svg_flag')?.setValue('');
    fileUpload.clear();
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

  onCreate(data: LanguageRequest) {
    this.languageService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Lenguaje creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Lenguaje.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.languageService.loadLanguages(),
    });
  }

  onUpdate(data: LanguageRequest) {
    this.languageService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Lenguaje actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Lenguaje.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.languageService.loadLanguages(),
    });
  }
}
