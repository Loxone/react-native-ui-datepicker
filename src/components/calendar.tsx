import React, { ReactNode, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import type { CalendarViews } from '../enums';
import Header from './header';
import Years from './years';
import Months from './months';
import Days from './days';
import TimePicker from './time-picker';
import { DatePickerBaseProps } from '../types';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <Years />,
  month: <Months />,
  day: <Days />,
  time: <TimePicker />,
};

type CalendarProps = {
    CustomCalendarViews?: DatePickerBaseProps['customCalendarViews'];
};

const Calendar = ({ CustomCalendarViews }: CalendarProps) => {
  const {
    hideHeader,
    calendarView,
    style = {},
    className = '',
    styles = {},
    classNames = {},
    containerHeight,
    navigationPosition,
    isRTL,
    useTimePickerOnly,
  } = useCalendarContext();

  const containerStyle: ViewStyle = useMemo(
    () => ({
      height: containerHeight,
    }),
    [containerHeight]
  );

  return (
    <View style={style} className={className} testID="calendar">
      {!hideHeader && !useTimePickerOnly ? (
        <Header
          navigationPosition={navigationPosition}
          styles={styles}
          classNames={classNames}
          isRTL={isRTL}
        />
      ) : null}
      <View style={containerStyle}>{CustomCalendarViews?.[calendarView] ?? CalendarView[calendarView]}</View>
    </View>
  );
};

export default Calendar;
