import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'head-card',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './head-card.component.html',
  styles: ``,
})
export class HeadCardComponent {
  title = input.required();
  buttonLabel = input.required<string>();
  route = input<string>();
}
