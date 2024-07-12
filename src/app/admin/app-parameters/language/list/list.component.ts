import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { LanguageFormComponent } from '../form/form.component';
import { LanguageService } from '../../../services';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { Language } from '../../../../interfaces';

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
    LanguageFormComponent
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  languageService = inject(LanguageService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: Language | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: Language) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este Languaje?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.languageService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Languaje eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el Languaje.'
            );
          },
          complete: () => this.languageService.loadLanguages(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
