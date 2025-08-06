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
  public calendarMode = CalendarMode;
  public changePeriod = output<string>();
  public flagDate: InputSignal<Date> = input<Date>(new Date());
  public mode = input<CalendarMode>(this.calendarMode.MONTH);
  public weekLabel = input<string>();

  public periodLabel = computed(() => {
    const basic = `${ MONTHS[this.flagDate().getMonth()]} ${this.flagDate().getFullYear()}`;
    return this.mode() === this.calendarMode.MONTH ? basic : `${this.weekLabel()} ${basic}`;
  })

  public changePeriodAction(direction: 'prev' | 'next' = 'prev') {
    this.changePeriod.emit(direction);
  }
}
