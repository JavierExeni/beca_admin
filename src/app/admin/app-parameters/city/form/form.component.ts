import { NgIf } from '@angular/common';
import { Component, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { CityService, CountryService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';

import { City, CityRequest } from '../../../../interfaces';

@Component({
  selector: 'app-city-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class CityFormComponent {
  fb = inject(FormBuilder);
  cityService = inject(CityService);
  countryService = inject(CountryService);
  toastService = inject(ToastService);

  public selectedItem = input<City>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    country_id: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      this.form.patchValue({
        name: this.selectedItem()!.name,
        code: this.selectedItem()!.code,
        country_id: this.selectedItem()!.country.id as any,
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

  onCreate(data: CityRequest) {
    this.cityService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Ciudad creada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear la ciudad.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.cityService.loadCities(),
    });
  }

  onUpdate(data: CityRequest) {
    this.cityService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Ciudad actualizada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar al ciudad.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.cityService.loadCities(),
    });
  }
}
