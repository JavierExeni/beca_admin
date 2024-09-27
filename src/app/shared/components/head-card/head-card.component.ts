import { Component, inject, input, model, output } from '@angular/core';
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
  title = input();
  buttonLabel = input.required<string>();
  showButton = input<boolean>(true);
  route = input<string>();
  show = input<boolean>(true);
  isClicked = model<boolean>(false);
}
