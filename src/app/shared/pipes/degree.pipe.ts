import { Pipe, PipeTransform } from '@angular/core';
import { BECA_TYPE } from '../enum';

@Pipe({
  name: 'degree',
  standalone: true,
})
export class DegreePipe implements PipeTransform {
  transform(value: BECA_TYPE): string {
    switch (value) {
      case BECA_TYPE.DEGREE_ASSOCIATE:
        return 'Associate';
      case BECA_TYPE.DEGREE_BACHELOR:
        return 'Bachelor';
      case BECA_TYPE.DEGREE_DOCTORATE:
        return 'Doctorate';
      case BECA_TYPE.DEGREE_MASTER:
        return 'Master';
      default:
        return '';
    }
  }
}
