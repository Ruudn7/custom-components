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
import { MonthWeek } from './calendar.interface';
import { buildMonthWeeks } from './utils';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';

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
    CalendarCellComponent
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
  public monthWeeks: MonthWeek[] = [];

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

  public selectDate(date: Date) {
    console.log(date)
  }

}
