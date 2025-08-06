import { Component, inject, input, InputSignal, output } from '@angular/core';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { MonthWeek } from '../calendar.interface';
import { WeekByDatePipe } from '../pipe/week-by-date.pipe';
import { CalendarRangeManageService } from '../service/calendar-range-manage.service';

@Component({
  selector: 'app-calendar-body',
  imports: [CalendarCellComponent, WeekByDatePipe],
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.scss'
})
export class CalendarBodyComponent {

  private calendarRangeModeService = inject(CalendarRangeManageService);

  public monthWeeks: InputSignal<MonthWeek[]> = input<MonthWeek[]>([]);
  public mode = input<'month' | 'week'>('month');
  public flagDateSignal = input<Date>(new Date);
  public rangeMode = this.calendarRangeModeService.rangeModeOn;

  public onSelectDate = output<Date>();

  public trackByDate(date: Date): number {
    return date.getTime();
  }  

  public selectDate(date: Date) {
    this.onSelectDate.emit(date)
  }
}
