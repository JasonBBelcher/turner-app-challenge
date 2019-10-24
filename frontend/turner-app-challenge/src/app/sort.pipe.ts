import { Pipe, PipeTransform } from '@angular/core';
import { map, toArray } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { ITitle } from './interfaces/title.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Observable<any>, direction: string): any {
    value.subscribe((val) => {
      if (!val || !Array.isArray(val)) {
        return val;
      } else if (direction === 'z-a') {
        val.sort((a, b) => {
          let propA = a.TitleName.toUpperCase();
          let propB = b.TitleName.toUpperCase();
          if (propA < propB) {
            return 1;
          }

          if (propA > propB) {
            return -1;
          }

          return 0;

        })
      } else {
        val.sort((a, b) => {
          let propA = a.TitleName.toUpperCase();
          let propB = b.TitleName.toUpperCase();
          if (propA < propB) {
            return -1;
          }

          if (propA > propB) {
            return 1;
          }

          return 0;

        })
      }
    })

    return value;
  }

}
