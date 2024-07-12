import {
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

import { CountryService } from '../../../services/country.service';
import { Country, CountryRequest } from '../../../../interfaces';
import { NgIf } from '@angular/common';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-country-form',
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
export class CountryFormComponent implements OnChanges {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);
  toastService = inject(ToastService);

  public selectedItem = input<Country>();
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

  ngOnChanges(changes: SimpleChanges): void {
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

  onCreate(data: CountryRequest) {
    this.countryService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡País creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el país.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.countryService.loadCountries(),
    });
  }

  onUpdate(data: CountryRequest) {
    this.countryService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡País actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el país.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.countryService.loadCountries(),
    });
  }
}
