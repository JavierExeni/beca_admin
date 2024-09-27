import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { User, UserRequest } from '../../../../interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CityService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { GENDER, USER_TYPE } from '../../../../shared/enum';
import { AuthService } from '../../../../authentication/auth.service';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class AdminFormComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
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
      user_type: USER_TYPE.ADMIN,
      extra_fields: {
        user_id: this.authService.currentLoggedUser().id,
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
          '¡Admin creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Admin.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.userService.loadAdmins(),
    });
  }

  onUpdate(data: UserRequest) {
    this.userService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Admin actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Admin.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.userService.loadAdmins(),
    });
  }
}