import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { ToastService } from '../../../../shared/services/toast.service';
import { Beca } from '../../../../interfaces';
import { BecaService } from '../../../services/beca.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { BecaFormComponent } from '../form/form.component';
import { DatePipe } from '@angular/common';
import { DegreePipe } from '../../../../shared/pipes/degree.pipe';

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
    BecaFormComponent,
    DatePipe,
    DegreePipe
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  becaService = inject(BecaService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: Beca | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: Beca) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta beca?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.becaService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Beca eliminada!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar la Beca.'
            );
          },
          complete: () => this.becaService.loadBecas(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
