import { Component, inject, OnInit } from '@angular/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { TeacherFormComponent } from '../form/form.component';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { User } from '../../../../interfaces';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    HeadCardComponent,
    TeacherFormComponent,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent implements OnInit {
  userService = inject(UserService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  selectedItem: User | undefined;
  openEdit = false;
  openCreate = false;

  ngOnInit(): void {
    this.userService.loadTeachers();
  }

  editModal(item: User) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este profesor?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Profesor eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el Profesor.'
            );
          },
          complete: () => this.userService.loadTeachers(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
