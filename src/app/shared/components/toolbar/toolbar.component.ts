import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AuthService } from '../../../authentication/auth.service';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [SplitButtonModule, TitleCasePipe],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  authService = inject(AuthService);
  items: MenuItem[] = [
    {
      label: 'Log Out',
      command: () => {
        this.authService.logout();
      },
    },
  ];
}
