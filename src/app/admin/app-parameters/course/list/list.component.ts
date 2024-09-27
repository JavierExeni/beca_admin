import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { HeadCardComponent } from '../../../../shared/components/head-card/head-card.component';
import { CourseFormComponent } from '../form/form.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../../interfaces';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthService } from '../../../../authentication/auth.service';
import { USER_TYPE } from '../../../../shared/enum/user-type.enum';
import { TopicListComponent } from '../../topic/list/list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    OverlayPanelModule,
    TagModule,
    ConfirmDialogModule,
    HeadCardComponent,
    CourseFormComponent,
    TopicListComponent
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  courseService = inject(CourseService);
  authService = inject(AuthService);
  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  USER_TYPE = USER_TYPE;

  selectedItem: Course | undefined;
  openEdit = false;
  openCreate = false;
  expandedRows = {};

  expandAll() {
    this.expandedRows = this.courseService.courses().reduce((acc: any, c) => (acc[c.id] = true) && acc, {});
}

collapseAll() {
    this.expandedRows = {};
}

  editModal(item: Course) {
    this.openEdit = true;
    this.selectedItem = item;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este Curso?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.courseService.delete(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Curso eliminado!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar el Curso.'
            );
          },
          complete: () => this.courseService.loadCourses(),
        });
      },
      key: 'confirmDialog',
    });
  }
}
