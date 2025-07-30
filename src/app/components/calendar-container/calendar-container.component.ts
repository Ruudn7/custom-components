import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
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
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: PolishFullDayAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarContainerComponent implements AfterViewInit {
  public flagDateSignal: WritableSignal<Date> = signal(new Date());
  public mode: 'month' | 'week' = 'month';

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private renderer: Renderer2
  ) {
    this.dateAdapter.setLocale('pl-PL');

    effect(() => {
      this.getAllDaysInMonth(this.flagDateSignal());
      console.log(this.getWeekRangeInMonth(this.flagDateSignal()))
    });
  }

  ngAfterViewInit(): void {}

  public goToToday() {
    console.log('goToToday');
  }

  public changePeriodAction(direction = 'prev') {
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

  private getAllDaysInMonth(baseDate: Date): Date[] {
    const start = dayjs(baseDate).startOf('month');
    const end = dayjs(baseDate).endOf('month');

    const days: Date[] = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, 'day')) {
      days.push(current.toDate());
      current = current.add(1, 'day');
    }

    console.log(days.length);
    return days;
  }

  getWeekRangeInMonth(date: Date): {
    fullWeek: Date[];
    inMonth: Date[];
    beforeMonth: Date[];
    afterMonth: Date[];
  } {
    const target = dayjs(date);
    const month = target.month();
    const weekStart = target.startOf('isoWeek');
    const weekEnd = target.endOf('isoWeek');

    const fullWeek: Date[] = [];
    const inMonth: Date[] = [];
    const beforeMonth: Date[] = [];
    const afterMonth: Date[] = [];

    let current = weekStart;

    while (current.isBefore(weekEnd) || current.isSame(weekEnd, 'day')) {
      const d = current.toDate();
      fullWeek.push(d);

      if (current.month() === month) {
        inMonth.push(d);
      } else if (current.isBefore(target.startOf('month'))) {
        beforeMonth.push(d);
      } else {
        afterMonth.push(d);
      }

      current = current.add(1, 'day');
    }

    return {
      fullWeek,
      inMonth,
      beforeMonth,
      afterMonth,
    };
  }
}
