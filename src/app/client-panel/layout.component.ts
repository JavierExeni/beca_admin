import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { ToastService } from '../shared/services/toast.service';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidenavComponent,
    ToolbarComponent,
    ToastModule,
    NgFor,
  ],
  templateUrl: './layout.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService, ToastService],
})
export class LayoutComponent {
  toastService = inject(ToastService);
}
