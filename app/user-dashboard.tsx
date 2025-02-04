import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import { supabase } from '@/supabaseClient';
import {OptionToggle} from "@/components/dashboard/OptionToggle";
import {Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";

interface DateProps {
  dateString: string,
  day: number,
  month: number,
  timestamp: number,
  year: number,
}
export default function UserDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<string | undefined>();
  const [selectedApprovalStatus, setSelectedApprovalStatus] = React.useState<string | undefined>();
  const [selectedDate, setSelectedDate] = React.useState<string>(new Intl.DateTimeFormat('en-CA').format(new Date()));
  useEffect(() => {
    console.log(selectedApprovalStatus);
  }, [selectedApprovalStatus]);
  useEffect(() => {
    console.log(selectedTimeframe);
  }, [selectedTimeframe]);
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleDatePress = (date: DateProps) => {
    setSelectedDate(date.dateString);
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <CalendarProvider
          date={selectedDate}
          // onDateChanged={onDateChanged}
          // onMonthChange={onMonthChange}
          showTodayButton={false}
          // disabledOpacity={0.6}
          // theme={todayBtnTheme.current}
          // todayBottomMargin={16}
      >
      {/* Schedule Title*/}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Schedule</Text>
        <OptionToggle
            options={['Week', 'Month']}
            gap={8}
            handleToggledOption={setSelectedTimeframe}
        />
        <OptionToggle
            options={['Pending', 'Approved', 'Denied']}
            gap={4}
            handleToggledOption={setSelectedApprovalStatus}
        />
      </View>
      {
        selectedTimeframe == "Month" ?
              <Calendar
                enableSwipeMonths={true}
                onDayPress={(day: DateProps) => handleDatePress(day)}
                markedDates={{
                  [selectedDate]: {selected: true, selectedColor: 'blue'},
                  '2025-02-17': {marked: true},
                  '2025-02-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                  '2025-02-19': {disabled: true, disableTouchEvent: true}
                }}
              />
            :
              <WeekCalendar/>
      }
      </CalendarProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    margin: 16,
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeholderBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: 'black',
  },
});
