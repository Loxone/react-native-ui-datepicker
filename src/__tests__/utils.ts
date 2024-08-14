import { DatePickerBaseProps } from '../types';
import dayjs from 'dayjs';

export function getDefaultFormatters(locale = "en"): DatePickerBaseProps['formatters'] {
  return {
    time: (date, shouldIncludeSeconds) => dayjs(date).locale(locale).format( shouldIncludeSeconds ? "hh:mm:ss: A" : "hh:mm A"),
    monthName: (date) => dayjs(date).locale(locale).format('MMMM'),
    weekdayNameShort: (weekDayIndex) => {
      const currentWeekDayIndex = new Date().getDay();
      const diff = weekDayIndex - currentWeekDayIndex;
      return dayjs().add(diff, 'day').locale(locale).format('ddd');
    },
    year: (date) => dayjs(date).format('YYYY'),
  };
}
