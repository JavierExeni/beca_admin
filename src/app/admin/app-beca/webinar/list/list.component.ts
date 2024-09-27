import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { WebinarFormComponent } from '../form/form.component';
import { WebinarService } from '../../../services/webinar.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { Webinar } from '../../../../interfaces';
import { USER_TYPE } from '../../../../shared/enum';
import { AuthService } from '../../../../authentication/auth.service';

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
    WebinarFormComponent,
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  webinarService = inject(WebinarService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);
  authService = inject(AuthService);

  selectedItem: Webinar | undefined;
  openEdit = false;
  openCreate = false;

  USER_TYPE = USER_TYPE;

  editModal(item: Webinar) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta Webinar?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.webinarService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Webinar eliminada!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar la Webinar.'
            );
          },
          complete: () => this.webinarService.loadWebinars(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
