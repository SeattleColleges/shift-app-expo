import React, {Fragment, useCallback, useMemo, useState} from "react";
import {StyleSheet, View, Text} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';

export default function CalendarRework() {
    const date = new Date()
    const getDateString = date.toISOString().split("T")[0]
    console.log("Date str:", date.toISOString().split("T")[0])

    const [selected, setSelected] = useState(getDateString);

    const getDate = (count:number) => {
        const date = new Date(getDateString);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const marked = useMemo(() => {
        return {
            [getDate(-1)]: {
                dotColor: 'red',
                marked: true
            },
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'orange',
                selectedTextColor: 'red'
            }
        };
    }, [selected]);

    return (
        <View>
            <View>
                <Text>Hola mundo!</Text>
            </View>
            <Fragment>
                <Text style={styles.text}>Selectable date</Text>
                <Calendar
                    enableSwipeMonths
                    current={getDateString}
                    style={styles.calendar}
                    onDayPress={onDayPress}
                    markedDates={marked}
                />
            </Fragment>
        </View>
    );
}

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10
    },
    switchContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    switchText: {
        margin: 10,
        fontSize: 16
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    },
    disabledText: {
        color: 'grey'
    },
    defaultText: {
        color: 'purple'
    },
    customCalendar: {
        height: 250,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    customDay: {
        textAlign: 'center'
    },
    customHeader: {
        backgroundColor: '#FCC',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: -4,
        padding: 8
    },
    customTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    customTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00BBF2'
    }
});