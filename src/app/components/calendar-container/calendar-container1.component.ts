import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, output, Renderer2, signal, viewChild, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import dayjs from 'dayjs';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CALENDAR_FULL_DAYS, CALENDAR_SHORT_DAYS, DATE_FORMATS, MONTHS, WEEK_DAYS_JS_OREDR } from './date-formats.consts';
import { PolishFullDayAdapter } from './day-adapter';
import { hideBodyLabelCells, setHeaderFullNames, updateCalendarAriaLabels } from './utils';
import { getMonthRange } from './date.utils';
import { CalendarEvent } from './calendar.interface';
import { MatCardModule } from '@angular/material/card';
import { CALENDAR_EVENTS } from './events.const';

@Component({
  selector: 'app-calendar-containerasd',
  template: '',
  styleUrl: './calendar-container.component.scss',
  imports: [CommonModule, MatCalendar, NativeDateModule, MatCardModule, CalendarHeaderComponent],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: PolishFullDayAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarContainerComponent implements AfterViewInit {
  // public events = input<CalendarEvent[]>(CALENDAR_EVENTS);
  // public monthChange = output<number>();
  // public selectedDate = signal<Date | null>(new Date());

  // private calendar = viewChild<MatCalendar<Date>>(MatCalendar);
  // // private eventsServ = inject(EventsSectionService);
  // private calendarMutationObs: MutationObserver | null = null;
  // private destroyRef = inject(DestroyRef);

  public mode: "month" | "week" = 'month';

  // readonly calendarHeader = CalendarHeaderComponent;

  // @ViewChild(MatCalendar, { read: ElementRef }) calendarRef!: ElementRef;

  constructor(private dateAdapter: DateAdapter<Date>, private renderer: Renderer2) {
    this.dateAdapter.setLocale('pl-PL');
  }

  ngAfterViewInit(): void {
    // this.setCalednarChangesListerners();
  } 

  // public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //   if (view === 'month') {
  //     const date = dayjs(cellDate);
  //     if (
  //       this.events().some((event) => dayjs(event.start_date).isSame(date, 'day'))
  //     ) {
  //       return 'event-start-dot';
  //     } else if (
  //       this.events().some((event) => dayjs(event.end_date).isSame(date, 'day'))
  //     ) {
  //       return 'event-end-dot';
  //     }
  //     return '';
  //   }
  //   return '';
  // };

  // public goToDate(): void {
  //   const calendarRef = this.calendar();
  //   if (calendarRef) {
  //     const { viewStartDate, daysRange } = getMonthRange(0);
  //     // this.eventsServ.setEvents(viewStartDate, daysRange);
  //     calendarRef.activeDate = new Date();
  //     calendarRef.selected = new Date();
  //   }
  // }

  // public changeDate(newDate: Date | null): void {
  //   this.selectedDate.set(newDate);
  // }

  // private setCalednarChangesListerners(): void {
  //   const table = this.calendarRef.nativeElement.querySelector('.mat-calendar-table');
  //   if (table) {
  //     this.callAccesibilitCaledendarFunctions();

  //     this.calendarMutationObs = new MutationObserver(() => {
  //       this.callAccesibilitCaledendarFunctions();
  //     });
  //     this.calendarMutationObs.observe(table, { childList: true, subtree: true });

  //     this.destroyRef.onDestroy(() => {
  //       this.calendarMutationObs?.disconnect();
  //     });

  //   }
  // }

  // private callAccesibilitCaledendarFunctions(): void {
  //   updateCalendarAriaLabels(
  //     this.calendarRef,
  //     this.calendar(),
  //     MONTHS,
  //     WEEK_DAYS_JS_OREDR
  //   );
  //   setHeaderFullNames(
  //     this.calendarRef,
  //     CALENDAR_SHORT_DAYS,
  //     CALENDAR_FULL_DAYS
  //   );
  //   hideBodyLabelCells(this.calendarRef);
  // }

  // mode: 'month' | 'week' = 'month';
  // viewDate: Date = new Date();
  // range: { start: Date | null, end: Date | null } = { start: null, end: null };
  // selectedDay: Date | null = null;

  // onModeChange(newMode: 'month' | 'week') {
  //   this.mode = newMode;
  //   // Przełączenie viewDate na początek tygodnia/miesiąca jeśli trzeba
  // }
  // onMonthChange(newDate: Date) {
  //   this.viewDate = newDate;
  // }
  // onWeekChange(newDate: Date) {
  //   this.viewDate = newDate;
  // }
  goToToday() {
    // this.viewDate = new Date();
    // this.selectedDay = new Date();
    console.log('goToToday')
  }
  // onDaySelect(day: Date) {
  //   // Obsługa range selection, single click, double click, itd.
  //   if (!this.range.start || (this.range.start && this.range.end)) {
  //     this.range = { start: day, end: null };
  //   } else {
  //     this.range = { start: this.range.start, end: day };
  //   }
  //   this.selectedDay = day;
  // }




  
}
