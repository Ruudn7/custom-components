import { Pipe, PipeTransform } from '@angular/core';
import { MonthWeek } from '../calendar.interface';
import { CalendarMode } from '../date-formats.consts';
import dayjs from 'dayjs';

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
          (dayOfWeek: Date) => this.isSameDate(dayOfWeek, date)
        )
      );
      return found ? [found] : [];
    }
    return weeks;
  }


    private isSameDate(date: Date, dateToComapre: Date): boolean {
      return dayjs(date).isSame(dateToComapre, 'day') ;
    }
}
