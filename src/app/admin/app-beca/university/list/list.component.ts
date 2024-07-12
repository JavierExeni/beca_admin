import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { UniversityFormComponent } from '../form/form.component';
import { UniversityService } from '../../../services/university.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { University } from '../../../../interfaces';

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
    UniversityFormComponent,
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  universityService = inject(UniversityService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: University | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: University) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta universidad?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.universityService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Universidad eliminada!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar la Universidad.'
            );
          },
          complete: () => this.universityService.loadUniversities(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
