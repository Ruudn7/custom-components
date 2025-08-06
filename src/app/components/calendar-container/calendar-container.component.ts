import { CommonModule } from '@angular/common';
import {
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
import { CalendarMode } from './date-formats.consts';
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
export class CalendarContainerComponent {
  public flagDateSignal: WritableSignal<Date> = signal(new Date());
  public calendarMode = CalendarMode;
  public mode: CalendarMode = this.calendarMode.MONTH;
  public monthWeeks: MonthWeek[] = [];

  public weekPeriodVisibleIndex = computed(() => {
    const index = this.monthWeeks.findIndex(el => el.fullWeek.some(el => this.isSameDate(el, this.flagDateSignal())));

    return index === -1 ? 0 : index;
  });

  private readonly calendarRangeServ = inject(CalendarRangeManageService);

  constructor() {
    effect(() => {
      this.monthWeeks = buildMonthWeeks(this.flagDateSignal());
    });
  }

  public changePeriodAction(direction = 'prev') {
    if (this.mode === this.calendarMode.MONTH) {
      this.monthChangePeriod(direction);
    } else {
      this.weekChangePeriod(direction);
    }

  }

  public selectDate(date: Date) {
    this.flagDateSignal.set(date)
  }

  public resetDate(): void {
    this.flagDateSignal.set(new Date);
  }

  public rangeMode(): void {
    this.calendarRangeServ.setRangeMode(!this.calendarRangeServ.rangeModeOn());
  }

  public changeMode() {
    this.mode = this.mode === this.calendarMode.MONTH ? this.calendarMode.WEEK : this.calendarMode.MONTH;
  }

  public trackByDate(date: Date): number {
    return date.getTime();
  }  

  private monthChangePeriod(direction: string) {
    if (direction === 'prev') {
      this.flagDateSignal.update((prevDate) =>
        dayjs(prevDate).add(-1, 'month').startOf('month').toDate()
      );
    } else {
      this.flagDateSignal.update((prevDate) =>
        dayjs(prevDate).add(1, 'month').startOf('month').toDate()
      );
    }
  }

  private weekChangePeriod(direction: string) {
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

  private isSameDate(date: Date, dateToComapre: Date): boolean {
    return dayjs(date).isSame(dateToComapre, 'day') ;
  }

}
