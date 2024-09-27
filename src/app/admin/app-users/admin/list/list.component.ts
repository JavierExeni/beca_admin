import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { User } from '../../../../interfaces';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { AdminFormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    HeadCardComponent,
    AdminFormComponent,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent implements OnInit {
  userService = inject(UserService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: User | undefined;
  openEdit = false;
  openCreate = false;

  ngOnInit(): void {
    this.userService.loadAdmins();
  }

  editModal(item: User) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este cliente?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Cliente eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el Cliente.'
            );
          },
          complete: () => this.userService.loadAdmins(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
