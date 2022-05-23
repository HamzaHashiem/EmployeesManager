import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'genderName',
})
export class GenderNamePipe implements PipeTransform {
  transform(gender: boolean): string {
    if (gender) return 'Male';
    else return 'Female';
  }
}
