import { Component, inject, input, InputSignal, output, signal, WritableSignal } from '@angular/core';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { MonthWeek } from '../calendar.interface';
import { WeekByDatePipe } from '../pipe/week-by-date.pipe';
import { CalendarRangeManageService } from '../service/calendar-range-manage.service';
import { CALENDAR_DAYS_LABELS, CalendarMode, IsInMonth } from '../date-formats.consts';

@Component({
  selector: 'app-calendar-body',
  imports: [CalendarCellComponent, WeekByDatePipe],
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.scss'
})
export class CalendarBodyComponent {

  private calendarRangeModeService = inject(CalendarRangeManageService);

  public monthWeeks: InputSignal<MonthWeek[]> = input<MonthWeek[]>([]);
  public calendarMode = CalendarMode;
  public mode = input<CalendarMode>(this.calendarMode.MONTH);
  public flagDateSignal = input<Date>(new Date);
  public rangeMode = this.calendarRangeModeService.rangeModeOn;
  public calendarDaysLabels = CALENDAR_DAYS_LABELS;
  public selectedDate: WritableSignal<Date> = signal(new Date) ;
  public isInMonth = IsInMonth;

  public onSelectDate = output<Date>();

  public trackByDate(date: Date): number {
    return date.getTime();
  }  

  public selectDate(date: Date) {
    this.selectedDate.set(date);
    this.onSelectDate.emit(date)
  }
}
