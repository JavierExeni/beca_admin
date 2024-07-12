import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService } from 'primeng/api';

import { CountryService } from '../../../services';
import { ToastService } from '../../../../shared/services/toast.service';
import { Country } from '../../../../interfaces';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { CountryFormComponent } from '../form/form.component';

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
    CountryFormComponent
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  countryService = inject(CountryService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: Country | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: Country) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este País?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.countryService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡País eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el País.'
            );
          },
          complete: () => this.countryService.loadCountries(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
