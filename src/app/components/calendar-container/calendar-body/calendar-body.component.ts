import { Component, inject, input, InputSignal, output, signal } from '@angular/core';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { MonthWeek } from '../calendar.interface';
import { WeekByDatePipe } from '../pipe/week-by-date.pipe';
import { CalendarRangeManageService } from '../service/calendar-range-manage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-body',
  imports: [CalendarCellComponent, WeekByDatePipe, DatePipe],
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.scss'
})
export class CalendarBodyComponent {

  private calendarRangeModeService = inject(CalendarRangeManageService);

  public monthWeeks: InputSignal<MonthWeek[]> = input<MonthWeek[]>([]);
  public mode = input<'month' | 'week'>('month');
  public flagDateSignal = input<Date>(new Date);
  public rangeMode = this.calendarRangeModeService.rangeModeOn;
  public startDate = this.calendarRangeModeService.startDate;
  public endDate = this.calendarRangeModeService.endDate;
  public hoverDate = this.calendarRangeModeService.hoverDate;


  public onSelectDate = output<Date>();

  public trackByDate(date: Date): number {
    return date.getTime();
  }  

  public selectDate(date: Date) {
    this.onSelectDate.emit(date)
  }
}
