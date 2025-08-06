import { Pipe, PipeTransform } from '@angular/core';
import { MonthWeek } from '../calendar.interface';
import { CalendarMode } from '../date-formats.consts';

@Pipe({
  name: 'weekByDate',
  standalone: true,
})
export class WeekByDatePipe implements PipeTransform {

  public calendarMode = CalendarMode;

  transform(
    weeks: MonthWeek[],
    date: Date,
    mode: CalendarMode
  ): MonthWeek[] {
    if (mode === this.calendarMode.WEEK) {
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
