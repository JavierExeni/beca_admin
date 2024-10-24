import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginRequest } from '../../interfaces';
import { AuthService } from '../auth.service';

import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { USER_TYPE } from '../../shared/enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, MessagesModule],
  templateUrl: './login.component.html',
  styles: ``,
  providers: [MessageService],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const data: LoginRequest = this.form.getRawValue();
    this.authService.login(data).subscribe({
      next: (res) => {
        console.log(res);
        switch (res.user_type) {
          case USER_TYPE.ADMIN:
            console.log('ADMIN');
            this.router.navigate(['/admin/usuarios/']);
            break;
          case USER_TYPE.TEACHER:
            console.log('TEACHER');
            this.router.navigate(['/admin/parametros/cursos/']);
            break;
          case USER_TYPE.CLIENT:
            console.log('CLIENT');
            this.router.navigate(['/public/webinars/']);
            break;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.authService.changeLoadingState(false);
        this.form.enable();
        this.messageService.add({
          severity: 'error',
          summary: 'Incorrect credentials.',
          detail: err.error.error || 'Invalid Token',
          life: 10000,
        });
      },
    });
  }
}
