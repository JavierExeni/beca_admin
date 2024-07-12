import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { ClientFormComponent } from '../form/form.component';
import { UserService } from '../../../services/user.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { Client, User } from '../../../../interfaces';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    HeadCardComponent,
    ClientFormComponent
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  userService= inject(UserService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: User | undefined;
  openEdit = false;
  openCreate = false;

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
          complete: () => this.userService.loadClients(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
