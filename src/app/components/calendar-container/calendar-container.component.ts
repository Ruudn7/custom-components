import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  WritableSignal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  NativeDateModule
} from '@angular/material/core';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { MonthWeek } from './calendar.interface';
import { CalendarRangeManageService } from './service/calendar-range-manage.service';
import { buildMonthWeeks } from './utils';

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

  constructor() {
    effect(() => {
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
    this.flagDateSignal.set(date)
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
