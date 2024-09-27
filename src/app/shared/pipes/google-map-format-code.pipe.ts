import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'googleMapFormatCode',
  standalone: true
})
export class GoogleMapFormatCodePipe implements PipeTransform {

  transform(value: string): string {
    let code = value.replaceAll('+', '%2B');
    code = code.replaceAll(' ', '+');
    return `https://www.google.es/maps/place/${code}/`
  }


}
