import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-clients-test-list',
  standalone: true,
  imports: [TagModule],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ClientsTestListComponent {
  clients = input<any>();
}
