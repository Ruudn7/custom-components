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
import { CalendarMode, MONTHS } from '../date-formats.consts';

@Component({
  selector: 'app-calendar-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
})
export class CalendarHeaderComponent {
  public periodLabel: WritableSignal<string> = signal<string>('');
  public flagDate: InputSignal<Date> = input<Date>(new Date());
  public calendarMode = CalendarMode;
  public mode = input<CalendarMode>(this.calendarMode.MONTH);
  public changePeriod = output<string>();
  public weekLabel = input<string>('');

  constructor() {
    effect(() => {
      this.periodLabel.update(() => {
        const basic = `${ MONTHS[this.flagDate().getMonth()]} ${this.flagDate().getFullYear()}`;
        return this.mode() === this.calendarMode.MONTH ? basic : `${this.weekLabel()} ${basic}`;
      });
    });
  }

  public changePeriodAction(direction = 'prev') {
    this.changePeriod.emit(direction);
  }
}
