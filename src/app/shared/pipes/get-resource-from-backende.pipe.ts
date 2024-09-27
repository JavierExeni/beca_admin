import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'getResourceFromBackend',
  standalone: true
})
export class GetResourceFromBackendPipe implements PipeTransform {

  transform(path: string): string {
    return `${environment.baseUrl}media/${path}`;
  }

}
