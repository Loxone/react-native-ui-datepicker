import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { getParsedDate, getMonths, getDateYear } from '../utils';

const MonthSelector = () => {
  const { currentDate, onSelectMonth, theme, formatters, maxDate, minDate } = useCalendarContext();
  const { month } = getParsedDate(currentDate);
  const parsedMinDate = minDate ? getParsedDate(minDate) : undefined;
  const parsedMaxDate = maxDate ? getParsedDate(maxDate) : undefined;
  const currentYear = getDateYear(currentDate);
  const minMonthToUse = parsedMinDate && currentYear === parsedMinDate.year ? parsedMinDate.month : undefined;
  const maxMonthToUse = parsedMaxDate && currentYear === parsedMaxDate.year ? parsedMaxDate.month : undefined;

  return (
    <View style={styles.container} testID="month-selector">
      <View style={styles.monthsContainer}>
        {getMonths()?.map((item, index) => {
          const activeItemStyle =
            index === month
              ? {
                  borderColor: theme?.selectedItemColor || '#0047FF',
                  backgroundColor: theme?.selectedItemColor || '#0047FF',
                }
              : null;

          const textStyle =
            index === month
              ? { color: '#fff', ...theme?.selectedTextStyle }
              : theme?.calendarTextStyle;

          let isOutOfRange = false;
          if (minMonthToUse && index < minMonthToUse) {
            isOutOfRange = true;
          } else if (maxMonthToUse && index > maxMonthToUse) {
            isOutOfRange = true;
          }

          const formattedItem = formatters?.monthName ? formatters.monthName(new Date(2024, index, 1)) : item;

          return (
            <Pressable
              key={index}
              style={[styles.monthCell, isOutOfRange ? styles.disabledMonthCell : null]}
              onPress={() => onSelectMonth(index)}
              accessibilityRole="button"
              accessibilityLabel={item}
              disabled={isOutOfRange}
            >
              <View
                style={[
                  styles.month,
                  theme?.monthContainerStyle,
                  activeItemStyle,
                ]}
              >
                <Text key={index} style={textStyle}>
                  {formattedItem}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthCell: {
    width: '33.3%',
  },
  disabledMonthCell: {
    opacity: 0.3,
  },
  month: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
});

export default MonthSelector;
