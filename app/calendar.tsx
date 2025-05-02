// ------------------------------
// CALENDAR REWORK (with Margin Top)
// ------------------------------

import React, {
    useRef,
    useCallback,
    useState,
    forwardRef
} from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
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
import AgendaItem from '../components/AgendaItem';

// Remove deprecated defaultProps hack
// @ts-ignore
(ExpandableCalendar).defaultProps = undefined;



// Wrapper forwards React ref into the library's forwardedRef API
const ForwardedExpandableCalendar = forwardRef((props, ref) => (
    <ExpandableCalendar {...props} forwardedRef={ref} />
));

const ITEMS = [
    { title: '2023-05-01', data: [{ id: '1', text: 'First event' }] },
    { title: '2023-05-02', data: [{ id: '2', text: 'Second event' }] }
];

type MarkedDatesMap = Record<string, { marked?: boolean; dots?: Array<{ key: string; color: string }> }>;
const getMarkedDates = (): MarkedDatesMap => {
    const marked: MarkedDatesMap = {};
    ITEMS.forEach(item => {
        marked[item.title] = { marked: true, dots: item.data.map(evt => ({ key: evt.id, color: themeColor })) };
    });
    return marked;
};

const CHEVRON = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' };
const leftArrowIcon = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' };
const rightArrowIcon = { uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' };

interface CalendarReworkProps {
    weekView?: boolean;
    style?: any;
}

const CalendarRework: React.FC<CalendarReworkProps> = ({ weekView = false, style }) => {
    const today = new Date().toISOString().split('T')[0];

    const [selected, setSelected] = useState<string>(today);
    const markedDates = useRef<MarkedDatesMap>(getMarkedDates());
    const theme = useRef(getTheme());
    const todayBtnTheme = useRef({ todayButtonTextColor: themeColor });

    const calendarRef = useRef(null);
    const rotation = useRef(new Animated.Value(0));

    const onDayPress = useCallback((day: any) => {
        setSelected(day.dateString);
    }, []);

    const toggleCalendarExpansion = useCallback(() => {
        if (!calendarRef.current) return;
        // @ts-ignore
        const isOpen = calendarRef.current.toggleCalendarPosition();
        Animated.timing(rotation.current, {
            toValue: isOpen ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
    }, []);

    const onCalendarToggled = useCallback((isOpen: boolean) => {
        rotation.current.setValue(isOpen ? 1 : 0);
    }, []);

    const headerRenderer = renderHeaderUtils({ rotation, toggleCalendarExpansion, CHEVRON, styles });
    const renderItem = useCallback(({ item }: any) => <AgendaItem item={item} />, []);

    return (
        <View style={[styles.container, style]}>
            <CalendarProvider date={today} showTodayButton theme={todayBtnTheme.current}>
                {weekView ? (
                    <WeekCalendar firstDay={1} markedDates={markedDates.current} />
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
                    />
                )}
                <AgendaList
                    sections={ITEMS}
                    renderItem={renderItem}
                    sectionStyle={styles.section}
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
        textTransform: 'capitalize'
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    }
});
