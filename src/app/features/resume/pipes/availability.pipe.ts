import { Pipe, PipeTransform } from '@angular/core';
import { parse, format, isAfter } from 'date-fns';

@Pipe({
  name: 'availability',
  standalone: true,
})
export class AvailabilityPipe implements PipeTransform {
  transform(value: string): string {
    const defaultDate: Date = parse(value, 'dd-MM-yyyy', new Date());
    const today: Date = new Date();
    return isAfter(defaultDate, today)
      ? `Disponible le ${format(defaultDate, 'dd/MM/yyyy')}`
      : 'Disponible';
  }
}
