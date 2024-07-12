import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { ToastService } from '../shared/services/toast.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ToolbarComponent, ToastModule, NgFor],
  templateUrl: './layout.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService, ToastService],
})
export class LayoutComponent {
  toastService = inject(ToastService);
}
