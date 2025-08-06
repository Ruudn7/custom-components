import { Component, computed, input, InputSignal, output } from '@angular/core';
import { CalendarRangeCellDirective } from '../directives/calendar-range-cell.directive';
import { IsInMonth } from '../date-formats.consts';

@Component({
  selector: 'app-calendar-cell',
  imports: [CalendarRangeCellDirective],
  templateUrl: './calendar-cell.component.html',
  styleUrl: './calendar-cell.component.scss'
})
export class CalendarCellComponent {

  isInMonth = IsInMonth;
  date: InputSignal<Date> = input.required<Date>();
  mode: InputSignal<IsInMonth> = input<IsInMonth>(this.isInMonth.IN_MONTH);
  selectedDate: InputSignal<Date> = input.required<Date>();

  dateClicked = output<Date>();
  rangeMode = input<Boolean>();

  get displayDate(): number {
    return this.date().getDate();
  }

  isSelectedDate = computed(() => {
    const selectedDate = this.selectedDate();
    const date = this.date();

    return this.dateCompare(selectedDate, date);
  });

  selectDate(): void {
    this.dateClicked.emit(this.date());
  }

  get isToday(): boolean {
    const today = new Date();
    const date = this.date();
  
    return this.dateCompare(today, date);
  }

  private dateCompare(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
}
