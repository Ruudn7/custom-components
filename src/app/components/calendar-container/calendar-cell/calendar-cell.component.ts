import { Component, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'app-calendar-cell',
  imports: [],
  templateUrl: './calendar-cell.component.html',
  styleUrl: './calendar-cell.component.scss'
})
export class CalendarCellComponent {

  date: InputSignal<Date> = input.required<Date>();
  mode: InputSignal<'inMonth' | 'outOfMonth'> = input<'inMonth' | 'outOfMonth'>('inMonth');

  dateClicked = output<Date>();

  get displayDate(): number {
    return this.date().getDate();
  }

  selectDate(): void {
    this.dateClicked.emit(this.date());
  }

  get isToday(): boolean {
    const today = new Date();
    const date = this.date();
  
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
