export interface CalendarEvent {
  color: string;
  content: string;
  end_date: string;
  id: number;
  link: string;
  program_code?: ProgramCodes;
  start_date: string;
  text: string;
  visible?: boolean;
}

export enum ProgramCodes {
  one = 'Pomoc krajowa',
  two = 'PROW 1420',
  three = 'PS WPR 2023-2027',
  four = 'Inne',
}

export interface MonthWeek {
  label: string;
  fullWeek: Date[];
  inMonth: Date[];
  beforeMonth: Date[];
  afterMonth: Date[];
};
