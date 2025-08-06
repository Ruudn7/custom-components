import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DATE_FORMATS } from './date-formats.consts';
import { PolishFullDayAdapter } from './day-adapter';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { MonthWeek } from './calendar.interface';
import { buildMonthWeeks } from './utils';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { WeekByDatePipe } from './pipe/week-by-date.pipe';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { CalendarRangeManageService } from './service/calendar-range-manage.service';

dayjs.extend(isoWeek);

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss',
  imports: [
    CommonModule,
    NativeDateModule,
    MatCardModule,
    CalendarHeaderComponent,
    CalendarBodyComponent
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: PolishFullDayAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    CalendarRangeManageService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarContainerComponent implements AfterViewInit {
  public flagDateSignal: WritableSignal<Date> = signal(new Date());
  public mode: 'month' | 'week' = 'month';
  public monthWeeks: MonthWeek[] = [];

  public weekPeriodVisibleIndex = computed(() => {
    this.monthWeeks.find(el => el.fullWeek.some(el => this.isSameDate(el, this.flagDateSignal())));
      return this.monthWeeks.findIndex(el => el.fullWeek.some(el => this.isSameDate(el, this.flagDateSignal())))
    
  });

  private readonly calendarrangeServ = inject(CalendarRangeManageService);

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private renderer: Renderer2
  ) {
    this.dateAdapter.setLocale('pl-PL');

    effect(() => {
      console.log(buildMonthWeeks(this.flagDateSignal()));
      this.monthWeeks = buildMonthWeeks(this.flagDateSignal());
    });
  }

  ngAfterViewInit(): void {}

  public goToToday() {
    console.log('goToToday');
  }

  public changePeriodAction(direction = 'prev') {
    if (this.mode === 'month') {
      if (direction === 'prev') {
        this.flagDateSignal.update((prevDate) =>
          dayjs(prevDate).add(-1, 'month').startOf('month').toDate()
        );
      } else {
        this.flagDateSignal.update((prevDate) =>
          dayjs(prevDate).add(1, 'month').startOf('month').toDate()
        );
      }
    } else {
      if (direction === 'prev') {
        this.flagDateSignal.update((prevDate) =>
          dayjs(prevDate).add(-1, 'week').startOf('isoWeek').toDate()
        );
      } else {
        this.flagDateSignal.update((prevDate) =>
          dayjs(prevDate).add(1, 'week').startOf('isoWeek').toDate()
        );
      }
    }

  }

  public selectDate(date: Date) {
    console.log(date)
  }

  public resetDate(): void {
    this.flagDateSignal.set(new Date);
  }

  public rangeMode(): void {
    this.calendarrangeServ.setRangeMode(!this.calendarrangeServ.rangeModeOn());
  }

  private isSameDate(date: Date, dateToComapre: Date): boolean {
  
    return (
      date.getDate() === dateToComapre.getDate() &&
      date.getMonth() === dateToComapre.getMonth() &&
      date.getFullYear() === dateToComapre.getFullYear()
    );
  }

  public changeMode() {
    this.mode = this.mode === 'month' ? 'week' : 'month';
  }

  public trackByDate(date: Date): number {
    return date.getTime();
  }  

}
