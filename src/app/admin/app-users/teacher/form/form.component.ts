import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

import { UserService } from '../../../services/user.service';
import { CityService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';
import { User, UserRequest } from '../../../../interfaces';
import { GENDER, USER_TYPE } from '../../../../shared/enum';

@Component({
  selector: 'app-teacher-form',
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
export class TeacherFormComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  cityService = inject(CityService);
  toastService = inject(ToastService);

  public selectedItem = input<User>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  stateOptions: any[] = [
    { label: 'Masculino', value: GENDER.GENDER_MALE },
    { label: 'Femenino', value: GENDER.GENDER_FEMALE },
    { label: 'Otro', value: GENDER.GENDER_OTHER },
  ];

  form = this.fb.group({
    password: ['', Validators.required],
    username: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
    city_id: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      const data = this.selectedItem();
      this.form.patchValue({
        username: data!.username,
        first_name: data!.first_name,
        last_name: data!.last_name,
        email: data!.email,
      });
    }
  }

  onSubmit() {
    const dataForm = this.form.getRawValue() as any;
    const data = {
      user: {
        ...dataForm,
      },
      user_type: USER_TYPE.TEACHER,
      extra_fields: {
        ...dataForm,
      },
    };
    if (this.isEdit()) {
      this.onUpdate(dataForm);
      return;
    }
    this.onCreate(data);
  }

  onCreate(data: UserRequest) {
    this.userService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Profesor creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Profesor.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.userService.loadTeachers(),
    });
  }

  onUpdate(data: UserRequest) {
    this.userService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Profesor actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Profesor.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.userService.loadTeachers(),
    });
  }
}
