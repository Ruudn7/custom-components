import { TestBed } from '@angular/core/testing';

import { CalendarRangeManageService } from './calendar-range-manage.service';

describe('CalendarRangeManageService', () => {
  let service: CalendarRangeManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarRangeManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
