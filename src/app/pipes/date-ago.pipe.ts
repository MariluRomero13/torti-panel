import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) { return 'Hace un momento'; }
      const intervals = {
          'año': 31536000,
          'mes': 2592000,
          'semana': 604800,
          'día': 86400,
          'hora': 3600,
          'minuto': 60,
          'segundo': 1
      }
      let counter;
      // tslint:disable-next-line: forin
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return 'Hace ' + counter + ' ' + i + '';
          } else {
              return 'Hace ' + counter + ' ' + i + 's';
          }
        }
      }
    }
    return value;
  }
}
