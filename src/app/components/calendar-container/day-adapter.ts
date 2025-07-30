import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { CALENDAR_DAYS_LABELS } from './date-formats.consts';

@Injectable()
export class PolishFullDayAdapter extends NativeDateAdapter {

  override getDayOfWeekNames(): string[] {
    return CALENDAR_DAYS_LABELS;
  }
}