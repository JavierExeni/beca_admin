import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Course, Test } from '../../../../interfaces';
import { TestService } from '../../../services/test.service';
import { FileUploadModule } from 'primeng/fileupload';
import { JsonPipe } from '@angular/common';
import { concatMap, from, of } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { Question } from '../../../../interfaces/question.interface';
import { ClientsTestListComponent } from "../list/list.component";

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    ToggleButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    JsonPipe,
    ClientsTestListComponent
],
  templateUrl: './form.component.html',
  styles: ``,
})
export class TestFormComponent implements OnInit, OnChanges {
  fb = inject(FormBuilder);
  testService = inject(TestService);
  courseService = inject(CourseService);

  public selectedItem = input<Course>();
  public isEdit = input<boolean>(false);
  public modalState = output<boolean>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    passingScorePercentage: [40, Validators.required],
    questions: new FormArray([]),
  });

  test!: Test;

  // Obtener el FormArray desde el FormGroup
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEdit()) {
      this.testService.getTest(this.selectedItem()!.test as any).subscribe({
        next: (res) => {
          console.log(res);
          this.test = res;
          this.form.patchValue({
            title: res.title,
            description: res.description,
            passingScorePercentage: res.passingScorePercentage,
            questions:
              res.questions && res.questions.length == 0
                ? []
                : (res.questions as any),
          });
          if (res.questions) {
            res.questions.forEach((element, index) => {
              element.options.forEach((option) => {
                const optionFormGroup = this.fb.group({
                  possible_answer: [
                    option.possible_answer,
                    Validators.required,
                  ],
                  is_correct: [option.is_correct],
                  resource: [option.resource],
                });
                const optionformArray = this.questions.controls[index].get(
                  'options'
                ) as FormArray;
                optionformArray.push(optionFormGroup);
              });
            });
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this.addQuestion();
  }

  addQuestion() {
    const questionFormGroup = this.fb.group({
      instruction: ['', Validators.required],
      question: [''],
      resource: [''],
      score: [0],
      options: new FormArray([]),
    });
    this.questions.push(questionFormGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addOption(index: number = 0) {
    const optionFormGroup = this.fb.group({
      possible_answer: ['', Validators.required],
      is_correct: [false],
      resource: [''],
    });
    const optionformArray = this.questions.controls[index].get(
      'options'
    ) as FormArray;
    optionformArray.push(optionFormGroup);
  }

  deleteOption(index: number, optIndex: number) {
    (this.questions.controls[index].get('options') as FormArray).removeAt(
      optIndex
    );
  }

  saveDocument(event: any, index: number) {
    for (let file of event.files) {
      this.questions.controls[index].get('resource')?.setValue(file);
    }
  }

  deleteDocument(fileUpload: any, index: number) {
    this.questions.controls[index].get('resource')?.setValue('');
    fileUpload.clear();
  }

  saveFileOption(event: any, index: number, optIndex: number) {
    for (let file of event.files) {
      (this.questions.controls[index].get('options') as FormArray).controls[
        optIndex
      ]
        .get('resource')
        ?.setValue(file);
    }
  }

  deleteFileOption(fileUpload: any, index: number, optIndex: number) {
    (this.questions.controls[index].get('options') as FormArray).controls[
      optIndex
    ]
      .get('resource')
      ?.setValue('');
    fileUpload.clear();
  }

  onSubmit() {
    const { title, description, passingScorePercentage } =
      this.form.getRawValue();
    this.testService
      .createTest(title!, description!, passingScorePercentage!)
      .pipe(
        concatMap((res: any) => {
          return this.courseService
            .update(this.selectedItem()!.id, {
              test: res.id,
            })
            .pipe(
              concatMap(() => {
                const updatedQuestions = this.questions.controls.map(
                  (question, index) => ({
                    ...question,
                    test: res.id,
                    order: index,
                  })
                );

                return from(updatedQuestions).pipe(
                  concatMap((question: any) =>
                    this.testService.createQuestion(question).pipe(
                      concatMap((registeredQuestion: any) => {
                        // Agregar el ID de la pregunta registrada a cada opción
                        console.log(question);
                        if (
                          question.value.options &&
                          question.value.options.length > 0
                        ) {
                          console.log(question.value.options);
                          const updatedOptions = question.value.options.map(
                            (option: any, index: number) => ({
                              ...option,
                              question: registeredQuestion.id,
                              order: index,
                            })
                          );

                          // Registrar las opciones de cada pregunta en secuencia
                          return from(updatedOptions).pipe(
                            concatMap((option) =>
                              this.testService.createOption(option)
                            )
                          );
                        } else {
                          return of(null);
                        }
                      })
                    )
                  )
                );
              })
            );
        })
      )
      .subscribe({
        complete: () => {
          this.courseService.loadCourses();
        },
      });
  }
}
