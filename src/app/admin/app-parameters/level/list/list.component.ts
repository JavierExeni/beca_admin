import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { LevelFormComponent } from '../form/form.component';
import { LevelService } from '../../../services';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { Level } from '../../../../interfaces';

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
    LevelFormComponent
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  levelService = inject(LevelService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: Level | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: Level) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este Nivel?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.levelService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Nivel eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el Nivel.'
            );
          },
          complete: () => this.levelService.loadLevels(),
        });
      },
      key: 'confirmDialog',
    });
  }
}

