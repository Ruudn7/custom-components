import { Pipe, PipeTransform } from '@angular/core';
import { MonthWeek } from '../calendar.interface';

@Pipe({
  name: 'weekByDate',
  standalone: true,
})
export class WeekByDatePipe implements PipeTransform {
  transform(
    weeks: MonthWeek[],
    date: Date,
    mode: 'month' | 'week'
  ): MonthWeek[] {
    if (mode === 'week') {
      const found = weeks.find((week) =>
        week.fullWeek.some(
          (dayOfWeek: Date) =>
            dayOfWeek.getDate() === date.getDate() &&
            dayOfWeek.getMonth() === date.getMonth() &&
            dayOfWeek.getFullYear() === date.getFullYear()
        )
      );
      return found ? [found] : [];
    }
    return weeks;
  }
}
