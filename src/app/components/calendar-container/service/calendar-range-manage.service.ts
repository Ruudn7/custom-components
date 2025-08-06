import { Injectable, Signal, signal, WritableSignal, computed } from '@angular/core';
import dayjs from 'dayjs';

@Injectable()
export class CalendarRangeManageService {

  private _startDate: WritableSignal<Date | null> = signal<Date | null>(null);
  private _endDate: WritableSignal<Date | null> = signal<Date | null>(null);
  private _hoverDate: WritableSignal<Date | null> = signal<Date | null>(null);
  private _rangeModeOn: WritableSignal<Boolean> = signal<Boolean>(false);
  
  public startDate: Signal<Date | null> = this._startDate.asReadonly();
  public endDate: Signal<Date | null> = this._endDate.asReadonly();
  public rangeModeOn: Signal<Boolean> = this._rangeModeOn.asReadonly();
  public hoverDate: Signal<Date | null> = this._hoverDate.asReadonly();

  public setRangeMode(isOn = true): void {
    this._rangeModeOn.set(isOn);
  }

  private setStartDate(startDate: Date): void {
    this._startDate.set(startDate);
  }

  private setEndDate(endDate: Date | null): void {
    this._endDate.set(endDate);
  }

  public setHoverDate(date: Date | null): void {
    this._hoverDate.set(date);
  }

  public setRangeDate(date: Date) {
    const start = this._startDate();
    const end = this._endDate();
  
    if (!start || (start && end)) {
      this.setStartDate(date);
      this.setEndDate(null);
      return;
    }
  
    if (date < start) {
      this.setStartDate(date);
      this.setEndDate(null);
    } else {
      this.setEndDate(date);
    }
  }

  public isStart(date: Date): boolean {
    return this._startDate() !== null && dayjs(this._startDate()).isSame(date, 'day');
  }
  
  public isEnd(date: Date): boolean {
    return this._endDate() !== null && dayjs(this._endDate()).isSame(date, 'day');
  }
  

}
