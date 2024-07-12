import { Component, inject } from '@angular/core';
import { LessonFormComponent } from '../form/form.component';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LessonService } from '../../../services';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { Lesson } from '../../../../interfaces';

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
    LessonFormComponent
  ],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {
  lessonService = inject(LessonService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: Lesson | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: Lesson) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta Lección?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.lessonService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Lección eliminada!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar la Lección.'
            );
          },
          complete: () => this.lessonService.loadlessons(),
        });
      },
      key: 'confirmDialog',
    });
  }
}