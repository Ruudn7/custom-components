import {
  Component,
  computed,
  effect,
  input,
  InputSignal,
  output,
  signal,
  WritableSignal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MONTHS } from '../date-formats.consts';

@Component({
  selector: 'app-calendar-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
})
export class CalendarHeaderComponent {
  periodLabel: WritableSignal<string> = signal<string>('');
  flagDate: InputSignal<Date> = input<Date>(new Date());
  mode = input<'month' | 'week'>('month');
  changePeriod = output<string>();
  weekLabel = input<string>('');

  adjacentMonthNames = computed(() => {
    this.flagDate();

    console.log(this.flagDate());
  });

  constructor() {
    effect(() => {
      this.periodLabel.update(() => {
        const basic = `${ MONTHS[this.flagDate().getMonth()]} ${this.flagDate().getFullYear()}`;
        return this.mode() === 'month' ? basic : `${this.weekLabel()} ${basic}`;
      });
    });
  }

  public changePeriodAction(direction = 'prev') {
    this.changePeriod.emit(direction);
  }
}
