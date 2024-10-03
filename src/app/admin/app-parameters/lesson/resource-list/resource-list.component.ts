import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { Lesson } from '../../../../interfaces';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

import { ToastService } from '../../../../shared/services/toast.service';
import { LessonService } from '../../../services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [
    TableModule,
    OverlayPanelModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  templateUrl: './resource-list.component.html',
  styles: ``,
})
export class ResourceListComponent implements OnChanges {
  public selectedItem = input<Lesson>();
  public modalState = output<boolean>();
  lessonService = inject(LessonService);

  confirmationService = inject(ConfirmationService);
  toastService = inject(ToastService);

  file = new FormControl();

  ngOnChanges(changes: SimpleChanges): void {
    this.lessonService.loadResourcesByLesson(this.selectedItem()!.id);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta Recurso?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.lessonService.deleteResource(id).subscribe({
          next: () => {
            this.toastService.showToast(
              'top-right',
              'success',
              'Success',
              '¡Recurso eliminada!'
            );
          },
          error: () => {
            this.toastService.showToast(
              'top-right',
              'error',
              'Error',
              'Error al eliminar la Recurso.'
            );
          },
          complete: () =>
            this.lessonService.loadResourcesByLesson(this.selectedItem()!.id),
        });
      },
      key: 'confirmDialogLesson',
    });
  }

  deleteDocument(fileUpload: any) {
    this.file.setValue(null);
    fileUpload.clear();
  }

  saveDocuments(event: any) {
    for (let file of event.files) {
      this.file.setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.create(file, this.selectedItem()!.id);
    }
  }

  create(resource: File, lesson: number) {
    this.lessonService.createResource(resource, lesson).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Recurso creada!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Recurso.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.lessonService.loadResourcesByLesson(this.selectedItem()!.id),
    });
  }
}
