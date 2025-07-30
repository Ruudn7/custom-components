import dayjs from 'dayjs';

export function getMonthRange(offset: number): { viewStartDate: string, daysRange: number } {
    const target = dayjs().add(offset, 'month');
    const viewStartDate = target.startOf('month').format('YYYY-MM-DD');
    const daysRange = target.daysInMonth();

    return {viewStartDate, daysRange};
}