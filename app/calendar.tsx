import React, {
    useRef,
    useCallback,
    useState,
    forwardRef
} from 'react';
import {Animated, Easing, Pressable, StyleSheet, Text, View} from 'react-native';
import {
    ExpandableCalendar,
    AgendaList,
    CalendarProvider,
    WeekCalendar,
    Calendar,
    type ExpandableCalendarProps
} from 'react-native-calendars';
import renderHeaderUtils from '@/components/ref/renderHeaderUtils';
import { getTheme, themeColor, lightThemeColor } from '../constants/theme';

// @ts-ignore -- Default props no longer supported
(ExpandableCalendar).defaultProps = undefined;

// Wrapper forwards React ref into the library's forwardedRef API
const ForwardedExpandableCalendar = forwardRef((props, ref) => (
    <ExpandableCalendar {...props} forwardedRef={ref} />
));

const dateTimeFormatter= (date) => {
    return new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
        hour12: true
    }).format(date);
}

const ITEMS = [
    { dayHeader: '2025-05-01', data: [{ id: '1', title: 'First event', status: 'confirmed', date:'2025-05-01' }] },
    { dayHeader: '2025-05-01', data: [{ id: '2', title: 'Second event', status: 'pending', date:'2025-05-01' }] },
    { dayHeader: '2025-05-01', data: [{ id: '3', title: 'Third event', status: 'confirmed', date:'2025-05-01' }] },
    { dayHeader: '2025-05-01', data: [{ id: '4', title: 'Fourth event', status: 'pending', date:'2025-05-01' }] },
    { dayHeader: '2025-05-02', data: [{ id: '5', title: 'Fifth event', status: 'confirmed', date:'2025-05-02' }] },
    { dayHeader: '2025-05-03', data: [{ id: '6', title: 'Sixth event', status: 'pending', date:'2025-05-03' }] },
    { dayHeader: '2025-05-03', data: [{ id: '7', title: 'Seventh event', status: 'pending', date:'2025-05-03' }] },
    { dayHeader: '2025-05-03', data: [{ id: '8', title: 'Eighth event', status: 'confirmed', date:'2025-05-03' }] },
    { dayHeader: '2025-05-03', data: [{ id: '9', title: 'Ninth event', status: 'confirmed', date:'2025-05-03' }] },
];

const eventColors = {
    confirmed: 'black',
    pending: 'orange',
    past: 'gray'
};

// Get dot color by event status
const getDotColor = (event: any) => {
    const eventDate = dateTimeFormatter(new Date(event.date))
    const today = dateTimeFormatter(new Date())
    //console.log(today," : ",eventDate)
    if(eventDate < today) {
        return eventColors.past;
    }
    return event.status === 'pending' ? eventColors.pending : eventColors.confirmed;
};

const getMarkedDates = (): Record<string, any> => {
    const marked: Record<string, any> = {};

    // Process each item
    ITEMS.forEach((item) => {
        const date = item.dayHeader;
        const MAX_DOTS = 3

        //  Initialize dots
        if (!marked[date]) {
            marked[date] = {
                dots: []
            };
        }

        // Only add dots if we haven't reached the maximum
        if (marked[date].dots.length < MAX_DOTS) {
            // Add dots for each item
            item.data.forEach((event) => {
                // Skip adding more dots if we've reached the maximum
                if (marked[date].dots.length < MAX_DOTS) {
                    marked[date].dots.push({
                        key: event.id,
                        color: getDotColor(event),
                        selectedDotColor: 'white'
                    });
                }
            });
        }
    });
    return marked;
};

const processSections = () => {
    const groupedByDate = new Map();

    // Group all events by date for agenda list
    ITEMS.forEach(item => {
        const date = item.dayHeader;
        if (!groupedByDate.has(date)) {
            groupedByDate.set(date, { title: date, data: [] });
        }

        // Add all events of item to group
        item.data.forEach(event => {
            groupedByDate.get(date).data.push(event);
        })
    })
    //console.log(Array.from(groupedByDate.values()))
    return Array.from(groupedByDate.values())
};

const CHEVRON = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' };
const leftArrowIcon = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' };
const rightArrowIcon = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' };

interface CalendarReworkProps {
    weekView?: boolean;
    style?: any;
}

const EventItem = ({ item }: { item: any }) => {
    const isPending = item.status === 'pending'

    return (
        <Pressable
            key={item.id}
            style={[
            styles.itemContainer,
            isPending && styles.pendingItemContainer
        ]} onPress={()=>console.log("Pressed: ",item.id)}>
            <Text style={[
                styles.itemTitle,
                isPending && styles.pendingItemTitle
            ]}>
                {JSON.stringify(item,null,2)} {"Pending: "+isPending}
            </Text>
        </Pressable>
    )
};

const CalendarRework: React.FC<CalendarReworkProps> = ({ weekView = false, style }) => {
    const today = new Date().toISOString().split('T')[0];

    const [selected, setSelected] = useState<string>(today);
    const markedDates = useRef(getMarkedDates());
    const sections = useRef(processSections());
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

    const renderItem = useCallback(({ item }: any) => <EventItem item={item} key = {item.id} />, []);

    return (
        <View style={[styles.container, style]}>
            <CalendarProvider date={today} showTodayButton theme={todayBtnTheme.current}>
                {weekView ? (
                    <WeekCalendar
                        firstDay={1}
                        markedDates={markedDates.current}
                    />
                ) : (
                    <ForwardedExpandableCalendar
                        ref={calendarRef}
                        renderHeader={headerRenderer}
                        onCalendarToggled={onCalendarToggled}
                        theme={theme.current}
                        firstDay={1}
                        markedDates={markedDates.current}
                        leftArrowImageSource={leftArrowIcon}
                        rightArrowImageSource={rightArrowIcon}
                        markingType={'multi-dot'}
                    />
                )}
                <AgendaList
                    sections={sections.current}
                    renderItem={renderItem}
                    sectionStyle={styles.section}
                    keyExtractor={(item) => item.id}
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
        color: 'orange'
    }
});