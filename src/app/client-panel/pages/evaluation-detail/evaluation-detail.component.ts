import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Test } from '../../../interfaces';
import { AsyncPipe, NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TestService } from '../../../admin/services/test.service';

interface Answer {
  option: number;
  question: number;
}

@Component({
  selector: 'app-evaluation-detail',
  standalone: true,
  imports: [AsyncPipe, NgClass, ButtonModule],
  templateUrl: './evaluation-detail.component.html',
  styles: ``,
})
export class EvaluationDetailComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  testService = inject(TestService);

  index = 0;

  answers: Answer[] = [];

  data$: Observable<Test> = this.activatedRoute.data.pipe(
    map(({ test }) => test)
  );

  selectedOption(option: number): number | null {
    const answer = this.answers.find((answer) => option == answer.option);
    return answer ? answer.option : null;
  }

  isFinalized(questionsLength: number): boolean {
    const answersLength = this.answers.length;
    return answersLength != questionsLength;
  }

  addAnswer(option: number, question: number) {
    console.log(option);
    const answer = this.answers.find((answer) => question == answer.question);
    if (answer) {
      this.answers = [
        ...this.answers.filter((answer) => answer.question != question),
      ];
    }
    this.answers.push({ option, question });
  }

  send(courseId: number) {
    console.log(this.answers);
    this.testService.addAnswer(this.answers).subscribe({
      next: () => {
        this.router.navigate(['/public/cursos', courseId])
      },
    });
  }
}
