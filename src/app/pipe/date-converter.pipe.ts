import { getLocaleDateFormat } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: number): String {
    return moment(new Date(value)).format('YYYY/MM/DD (ddd)');
  }
}
