import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

import { BecaService } from '../../../services/beca.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { CityService } from '../../../services';
import { UniversityService } from '../../../services/university.service';
import { Beca, BecaRequest } from '../../../../interfaces';
import { BECA_TYPE } from '../../../../shared/enum';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-beca-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class BecaFormComponent {
  fb = inject(FormBuilder);
  becaService = inject(BecaService);
  cityService = inject(CityService);
  universityService = inject(UniversityService);
  toastService = inject(ToastService);

  public selectedItem = input<Beca>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  stateOptions: any[] = [
    { label: 'Bachelor', value: BECA_TYPE.DEGREE_BACHELOR },
    { label: 'Associate', value: BECA_TYPE.DEGREE_ASSOCIATE },
    { label: 'Master', value: BECA_TYPE.DEGREE_MASTER },
    { label: 'Doctorate', value: BECA_TYPE.DEGREE_DOCTORATE },
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    degree: ['', Validators.required],
    begin: ['', Validators.required],
    duration_per_days: ['', Validators.required],
    city_id: ['', Validators.required],
    collage_id: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      const data = this.selectedItem();
      // this.form.patchValue({
      //   name: data!.name,
      //   web_site: data!.web_site,
      //   google_map_code: data!.google_map_code,
      //   type: data!.type as any,
      //   city: data!.id as any,
      // });
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

  onCreate(data: BecaRequest) {
    this.becaService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Beca creada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear la Beca.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.becaService.loadBecas(),
    });
  }

  onUpdate(data: BecaRequest) {
    this.becaService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Beca actualizada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar la Beca.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.becaService.loadBecas(),
    });
  }
}
