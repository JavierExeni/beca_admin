import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { CityFormComponent } from '../form/form.component';

import { CityService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';

import { City } from '../../../../interfaces';

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
    CityFormComponent
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  cityService = inject(CityService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: City | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: City) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta ciudad?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.cityService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Ciudad eliminada!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar la ciudad.'
            );
          },
          complete: () => this.cityService.loadCities(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
