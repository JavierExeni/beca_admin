import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-grid',
  standalone: true,
  imports: [],
  templateUrl: './item-grid.component.html',
  styles: ``
})
export class ItemGridComponent {
  item = input.required<any>();
}
