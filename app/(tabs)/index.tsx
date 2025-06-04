import React, {
  useRef,
  useCallback,
  useState,
  forwardRef, useMemo
} from 'react';
import {Animated, Easing, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
  AgendaList
} from 'react-native-calendars';
import AgendaItem from "@/components/AgendaItem";
import renderHeaderUtils from '@/components/ref/renderHeaderUtils';
import { getTheme, themeColor, lightThemeColor } from '@/constants/theme';
import dummyItems from "@/data/dummyItems";
import {dateTimeFormatter, generateRandomNumber} from "@/data/utils";
import {supabaseAdmin} from "@/lib/supabaseAdminClient";
import {useShifts} from "@/hooks/useShifts";




// @ts-ignore -- Default props no longer supported
(ExpandableCalendar).defaultProps = undefined;

const ITEMS = dummyItems

const eventColors = {
  confirmed: 'black',
  unconfirmed: 'gray',
  pending: 'orange',
  past: 'gray'
};

const getColorStatus = ( isGivingUp:boolean,isClaimed:boolean) => {
  if (!isGivingUp && !isClaimed) {
    return 'itemTitle';
  } else if (isGivingUp && isClaimed) {
    return 'unconfirmedItemTitle';
  }
  return 'pendingItemTitle';
}

// Get dot color by event status
const getDotColor = (event: any) => {
  //console.log("eventzzz: ",event)
  const eventDate = dateTimeFormatter(new Date(event.date))
  const today = dateTimeFormatter(new Date())
  //console.log(today," : ",eventDate)
  if(eventDate < today) {
    return eventColors.past;
  }
  return event.needs_coverage ? eventColors.unconfirmed : eventColors.confirmed;
};


const getMarkedDates = (ITEMS:any): Record<string, any> => {
  const marked: Record<string, any> = {};

  // Process each item
  ITEMS.forEach((item:any) => {
    const date = item.dayHeader;
    const MAX_DOTS = 3
    let keyCounter = 0;

    //  Initialize dots
    if (!marked[date]) {
      marked[date] = {
        dots: []
      };
    }

    // Only add dots if we haven't reached the maximum
    if (marked[date].dots.length < MAX_DOTS) {
      // Add dots for each item
      item.data.forEach((event,idx) => {
        // Skip adding more dots if we've reached the maximum
        if (marked[date].dots.length < MAX_DOTS) {
          marked[date].dots.push({
            key: `dot_${keyCounter++}`,
            color: getDotColor(event),
            selectedDotColor: 'white'
          });
        }
      });
    }
  });
  return marked;
};

const processSections = (items) => {
  const groupedByDate = new Map();
  items.forEach(item => {
    const date = item.dayHeader;
    if (!groupedByDate.has(date)) {
      groupedByDate.set(date, {
        title: date,
        key:  date,
        data: []
      });
    }
    groupedByDate.get(date).data.push(...item.data);
  });
  return Array.from(groupedByDate.values());
};


const CHEVRON = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' };
const leftArrowIcon = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' };
const rightArrowIcon = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' };

interface CalendarReworkProps {
  weekView?: boolean;
  style?: any;
}

const EventItem = ({ item }: { item: any }) => {
  // Pending only when need coverage and no one is covering
  //console.log('EventItem: '+JSON.stringify(item, null, 2));
  const coveringId = item.shift_change_data?.covering_profile_id ?? null;
  const containCoverId = item.needs_coverage && coveringId !== null

  const colorStatus = getColorStatus(item.needs_coverage,containCoverId);
  return (
      <>
        <AgendaItem item={item}  />
      </>
  )
};

const CalendarRework: React.FC<CalendarReworkProps> = ({ weekView = false, style }) => {
  const today = new Date().toISOString().split('T')[0];

  const {items,loading,error } = useShifts()
  console.log("Load: ",loading)
  //console.log("Error: ",error)
  //console.log(items)

  const [selected, setSelected] = useState<string>(today);
  const markedDates = useMemo(() => {
    if (!items) return {};
    return getMarkedDates(items);
  }, [items]);

  const sections = useMemo(() => {
    if (!items) return [];
    return processSections(items);
  }, [items]);

  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({ todayButtonTextColor: themeColor });

  const calendarRef = useRef(null);
  const rotation = useRef(new Animated.Value(0)).current;

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

  const toggleCalendarExpansion = useCallback(() => {
    if (!calendarRef.current) return;
    // @ts-ignore
    const isOpen = calendarRef.current.toggleCalendarPosition();
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start();
  }, [rotation]);

  const onCalendarToggled = useCallback((isOpen: boolean) => {
    rotation.setValue(isOpen ? 1 : 0);
  }, [rotation]);

  const headerRenderer = renderHeaderUtils({ rotation, toggleCalendarExpansion, CHEVRON, styles });

  const renderItem = useCallback(({ item }: any) => <EventItem item={item} onPress={onCalendarToggled} />, []);

  return (
      <View style={[styles.container, style]}>
        <CalendarProvider
            date={today} showTodayButton theme={todayBtnTheme.current}>
          {weekView ? (
              <WeekCalendar
                  firstDay={1}
                  markedDates={markedDates}
              />
          ) : (
              <ExpandableCalendar
                  renderHeader={headerRenderer}
                  onCalendarToggled={onCalendarToggled}
                  theme={theme.current}
                  firstDay={0}
                  markedDates={markedDates}
                  leftArrowImageSource={leftArrowIcon}
                  rightArrowImageSource={rightArrowIcon}
                  markingType={'multi-dot'}
              />
          )}
          <AgendaList
              sections={sections}
              renderItem={renderItem}
              sectionStyle={styles.section}
              keyExtractor={(item, index) => {
                const baseKey = `${item.id || 'no-id'}-${index}`;
                const dateKey = item.date || item.start_date || '';
                const timeKey = item.start_time || item.time || '';
                const key = `${baseKey}-${dateKey}-${timeKey}`
                console.log(key)
                return key
              }}
          />
        </CalendarProvider>
      </View>
  );
};

export default CalendarRework;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  calendar: {
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'silver'
  },
  pendingItemContainer: {
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#d0d0d0'
  },
  itemTitle: {
    fontSize: 16,
    color: '#333'
  },
  pendingItemTitle: {
    color: 'gray'
  },
  unconfirmedItemTitle: {
    color: 'orange',
  }

});