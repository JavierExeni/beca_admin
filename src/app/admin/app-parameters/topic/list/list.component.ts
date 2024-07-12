import { Component, inject } from '@angular/core';
import { TopicFormComponent } from '../form/form.component';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TopicService } from '../../../services';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { Topic } from '../../../../interfaces';

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
    TopicFormComponent,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  topicService = inject(TopicService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: Topic | undefined;
  openEdit = false;
  openCreate = false;

  editModal(item: Topic) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este Tema?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.topicService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Tema eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el Tema.'
            );
          },
          complete: () => this.topicService.loadTopics(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
