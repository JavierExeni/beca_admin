import { Component, inject } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';

import { AuthService } from '../../../authentication/auth.service';
import { TitleCasePipe } from '@angular/common';
import { AdminFormComponent } from '../../../admin/app-users/admin/form/form.component';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [SplitButtonModule, TitleCasePipe, DialogModule, AdminFormComponent],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  authService = inject(AuthService);

  visible = false;

  items: MenuItem[] = [
    {
      label: 'Perfil',
      command: () => {
        this.visible = true;
      },
    },
    {
      label: 'Log Out',
      command: () => {
        this.authService.logout();
      },
    },
  ];

}
