import { Component, computed, DestroyRef, effect, EventEmitter, inject, input, Input, InputSignal, OnInit, output, Output, Signal, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { startWith } from 'rxjs';
import { MONTHS } from '../date-formats.consts';
import dayjs from 'dayjs';

@Component({
  selector: 'app-calendar-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss'
})
export class CalendarHeaderComponent {

  periodLabel: WritableSignal<string> = signal<string>('');
  flagDate: InputSignal<Date> = input<Date>(new Date);
  mode = input<'month' | 'week'>('month');
  changePeriod = output<string>();

  adjacentMonthNames = computed(() => {
    this.flagDate();

    console.log(this.flagDate())
  })

  constructor() {
    effect(() => {
      this.periodLabel.set(`${MONTHS[this.flagDate().getMonth()]} ${this.flagDate().getFullYear()}`);
    });
  }

  public changePeriodAction(direction = 'prev') {
    this.changePeriod.emit(direction);
  }


}
