import {
  Component,
  inject,
  input,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Course, CourseRequest } from '../../../../interfaces';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';

import { LanguageService, LevelService } from '../../../services';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../../authentication/auth.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    ToggleButtonModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class CourseFormComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  courseService = inject(CourseService);
  languageService = inject(LanguageService);
  levelService = inject(LevelService);
  userService = inject(UserService);
  toastService = inject(ToastService);

  public selectedItem = input<Course>();
  public isEdit = input(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    title: ['', Validators.required],
    language: ['', Validators.required],
    level: ['', Validators.required],
    time_duration: ['', Validators.required],
    profesor_owned: ['', Validators.required],
    is_active: [true, Validators.required],
    test: [null, Validators.required],
  });

  get hasProfile(): boolean {
    return this.form.get('svg_flag')!.value == '' ||
      this.form.get('svg_flag')!.value == null
      ? false
      : true;
  }

  get teachers() {
    return this.userService.teachers().map((teacher) => ({
      ...teacher.user,
      full_name: `${teacher.user.first_name} ${teacher.user.last_name}`,
    }));
  }

  ngOnInit(): void {
    this.userService.loadTeachers();
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.isEdit() && this.selectedItem()) {
      this.form.patchValue({
        title: this.selectedItem()!.title,
        language: this.selectedItem()!.language.id as any,
        level: this.selectedItem()!.level.id as any,
        time_duration: this.selectedItem()!.time_duration as any,
        profesor_owned: this.selectedItem()!.profesor_owned as any,
        is_active: this.selectedItem()!.is_active,
        test: this.selectedItem()!.test
          ? (this.selectedItem()!.test as any)
          : null,
      });
    }
  }

  onSubmit() {
    const formValues = this.form.getRawValue() as any;
    const data = {
      ...formValues,
      created_by: this.authService.currentLoggedUser().id,
    };
    if (this.isEdit()) {
      this.onUpdate(data);
      return;
    }
    this.onCreate(data);
  }

  onCreate(data: CourseRequest) {
    this.courseService.create(data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Curso creado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al crear el Curso.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.courseService.loadCourses(),
    });
  }

  onUpdate(data: CourseRequest) {
    this.courseService.update(this.selectedItem()!.id, data).subscribe({
      next: () => {
        this.toastService.showToast(
          'top-right',
          'success',
          'Success',
          '¡Curso actualizado!'
        );
        this.modalState.emit(false);
      },
      error: () => {
        this.toastService.showToast(
          'top-right',
          'error',
          'Error',
          'Error al actualizar el Curso.'
        );
        this.modalState.emit(false);
      },
      complete: () => this.courseService.loadCourses(),
    });
  }
}
