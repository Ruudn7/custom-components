import { computed, Directive, ElementRef, HostBinding, HostListener, inject, input, Input, InputSignal, Signal } from '@angular/core';
import dayjs from 'dayjs';
import { CalendarRangeManageService } from '../service/calendar-range-manage.service';

@Directive({
  selector: '[appCalendarRangeCell]',
  standalone: true
})
export class CalendarRangeCellDirective {

  public readonly date: InputSignal<Date> = input.required<Date>();
  private rangeService = inject(CalendarRangeManageService);
  
  private startDate: Signal<Date | null> = this.rangeService.startDate;
  private endDate: Signal<Date | null> = this.rangeService.endDate;
  private hoverDate: Signal<Date | null> = this.rangeService.hoverDate;


  isInHoverRange = computed(() => {
    if (this.startDate() && this.endDate()) {
      return false;
    } else {
      return !!(this.startDate() && this.hoverDate() && dayjs(this.date()).isAfter(this.startDate(), 'day') && dayjs(this.date()).isBefore(this.hoverDate(), 'day'));
    }
  });

  isInDateRange = computed(() => {
    if (!this.startDate() || !this.endDate()) {
      return false;
    } else {
      return !!(this.startDate() && this.endDate() && (dayjs(this.date()).isAfter(this.startDate(), 'day') || dayjs(this.date()).isSame(this.startDate(), 'day')) && (dayjs(this.date()).isBefore(this.endDate(), 'day')));
    }
  })

  @HostListener('click') onClick() {
    this.rangeService.setRangeDate(this.date());
  }

  @HostListener('mouseenter') onHover() {
    this.rangeService.setHoverDate(this.date());
  }

  @HostBinding('class.selectedStart') get isStart() {
    return this.rangeService.isStart(this.date());
  }

  @HostBinding('class.selectedEnd') get isEnd() {
    return this.rangeService.isEnd(this.date());
  }

  @HostBinding('class.inHoverRange') get hoverRange() {
    return this.isInHoverRange();
  }

  @HostBinding('class.inDateRange') get dateRange() {
    return this.isInDateRange();
  }

  @HostBinding('class.isToday') get isToday() {
    return dayjs(this.date()).isSame(new Date(), 'day');
  }

  @HostBinding('class.outOfMonth') get isOutOfMonth() {
    return false;
  }

  @HostBinding('class.hoverIsEnd') get isHoverEnd() {
    const start = this.rangeService.startDate();
    const end = this.rangeService.endDate();
    const hover = this.rangeService.hoverDate();
    const current = this.date();
  
    if (!start || !hover || end) return false;
  
    const isHoverBeforeStart = dayjs(hover).isBefore(start, 'day');
  
    if (isHoverBeforeStart) {
      return dayjs(current).isSame(start, 'day');
    }
  
    return dayjs(current).isSame(hover, 'day');
  
  }

}
