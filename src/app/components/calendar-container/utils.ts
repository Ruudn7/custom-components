import { ElementRef } from "@angular/core";
import { MatCalendar } from "@angular/material/datepicker";

export function setHeaderFullNames(calendarRef: ElementRef, shortDays: string[], fullDays: string[]): void {
  const headerRow = calendarRef.nativeElement.querySelector('.mat-calendar-table thead tr:first-child');
  if (!headerRow) return;
  const headerCells = headerRow.querySelectorAll('th');
  headerCells.forEach((th: HTMLElement, idx: number) => {
    if (th.querySelector('.sr-only')) return;
    th.innerHTML = `
      <span class="sr-only">${fullDays[idx % 7]}</span>
      <span aria-hidden="true">${shortDays[idx % 7]}</span>
    `;
  });
  const dividerCells = calendarRef.nativeElement.querySelectorAll('.mat-calendar-table thead tr[aria-hidden="true"] th');
  dividerCells.forEach((th: HTMLElement) => {
    th.removeAttribute('aria-label');
    th.innerHTML = '';
  });
}

export function hideBodyLabelCells(calendarRef: ElementRef): void {
  const labelCells = calendarRef.nativeElement.querySelectorAll('.mat-calendar-body-label');
  labelCells.forEach((td: HTMLElement) => {
    td.setAttribute('aria-hidden', 'true');
  });
}

export function updateCalendarAriaLabels(
  calendarRef: ElementRef,
  calendar: MatCalendar<Date> | undefined,
  months: string[],
  weekDays: string[]
): void {
  const cellEls = calendarRef.nativeElement.querySelectorAll('.mat-calendar-body-cell');
  const calendarComp = calendar;
  const activeDate: Date = calendarComp?.activeDate || new Date();

  const label = calendarRef.nativeElement.querySelector('.mat-calendar-period-button')?.textContent?.trim();
  let [month, year] = label?.split(/\s+/) ?? ['', ''];
  year = year || activeDate.getFullYear().toString();
  month = month || activeDate.toLocaleString('pl-PL', { month: 'long' });

  cellEls.forEach((cell: HTMLElement) => {
    const dayEl = cell.querySelector('.mat-calendar-body-cell-content');
    const dayText = dayEl?.textContent?.trim();
    if (!dayText) return;

    const dataValue = cell.getAttribute('data-mat-calendar-value');
    const cellDate: Date = dataValue
      ? new Date(dataValue)
      : new Date(+year, months.indexOf(month.toLowerCase()), +dayText);

    const dayOfWeek = weekDays[cellDate.getDay()];
    const dayNum = cellDate.getDate();
    const cellMonth = cellDate.toLocaleString('pl-PL', { month: 'long' });
    const cellYear = cellDate.getFullYear();

    let aria = `${dayOfWeek} ${dayNum} ${cellMonth} ${cellYear} roku`;
    if (cell.classList.contains('event-start-dot') || cell.classList.contains('event-end-dot')) {
      aria += ' ma przypisane wydarzenia';
    }

    cell.setAttribute('aria-label', aria);
  });
}

