import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Test } from '../../../interfaces';
import { map, Observable } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [ButtonModule, NgClass, RouterLink, AsyncPipe],
  templateUrl: './evaluation.component.html',
  styles: ``,
})
export class EvaluationComponent {
  activatedRoute = inject(ActivatedRoute);

  data$: Observable<Test> = this.activatedRoute.data.pipe(
    map(({ test }) => (test))
  );

}
