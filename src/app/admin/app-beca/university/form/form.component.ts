import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

import { ToastService } from '../../../../shared/services/toast.service';
import { University, UniversityRequest } from '../../../../interfaces';
import { UniversityService } from '../../../services/university.service';
import { UNIVERSITY_TYPE } from '../../../../shared/enum';
import { CityService } from '../../../services';

@Component({
  selector: 'app-university-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class UniversityFormComponent {
  fb = inject(FormBuilder);
  universityService = inject(UniversityService);
  cityService = inject(CityService);
  toastService = inject(ToastService);

  public selectedItem = input<University>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  stateOptions: any[] = [
    { label: 'Público', value: UNIVERSITY_TYPE.PUBLIC },
    { label: 'Privado', value: UNIVERSITY_TYPE.PRIVATE },
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    web_site: ['', Validators.required],
    google_map_code: ['', Validators.required],
    city: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      const data = this.selectedItem();
      this.form.patchValue({
        name: data!.name,
        web_site: data!.web_site,
        google_map_code: data!.google_map_code,
        type: data!.type as any,
        city: data!.id as any,
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

  onCreate(data: UniversityRequest) {
    this.universityService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Universidad creada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear la Universidad.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.universityService.loadUniversities(),
    });
  }

  onUpdate(data: UniversityRequest) {
    this.universityService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Universidad actualizada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar la Universidad.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.universityService.loadUniversities(),
    });
  }
}
