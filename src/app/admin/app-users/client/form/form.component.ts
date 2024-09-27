import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Client, User, UserRequest } from '../../../../interfaces';
import { GENDER, USER_TYPE } from '../../../../shared/enum';
import { CityService } from '../../../services';
import { AuthService } from '../../../../authentication/auth.service';
import { DateService } from '../../../../shared/services/date.service';

@Component({
  selector: 'app-client-form',
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
export class ClientFormComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  cityService = inject(CityService);
  toastService = inject(ToastService);
  dateService = inject(DateService);

  public selectedItem = input<any>();
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
    birthdate: ['', Validators.required],
    gender: ['', Validators.required],
    city_id: ['', Validators.required],
  });

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      const data = this.selectedItem();
      this.form.patchValue({
        username: data.user.username,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        birthdate: data.birthdate,
        gender: data.gender,
        city_id: data.city_id,
      });
    }
  }

  onSubmit() {
    const dataForm = this.form.getRawValue() as any;
    const birthdate = this.dateService.formatDate(dataForm.birthdate);
    const data = {
      user: {
        ...dataForm,
        birthdate,
      },
      user_type: USER_TYPE.CLIENT,
      extra_fields: {
        ...dataForm,
        birthdate,
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
          '¡Cliente creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Cliente.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.userService.loadClients(),
    });
  }

  onUpdate(data: UserRequest) {
    this.userService.update(this.selectedItem().user.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Cliente actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Cliente.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.userService.loadClients(),
    });
  }
}
