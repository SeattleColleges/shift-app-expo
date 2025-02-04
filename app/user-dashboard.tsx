import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import { supabase } from '@/supabaseClient';
import {OptionToggle} from "@/components/dashboard/OptionToggle";
import {Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import {shiftData, ShiftData} from "@/data/dummyShiftData";
import {MarkedDates} from "react-native-calendars/src/types";

interface DateProps {
  dateString: string,
  day: number,
  month: number,
  timestamp: number,
  year: number,
}

export default function UserDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>();
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>(new Intl.DateTimeFormat('en-CA').format(new Date()));
  const [markedDates, setMarkedDates] = useState({});
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

  useEffect(() => {
    setMarkedDates(getMarkedDates(shiftData, selectedDate));
  }, [selectedDate]);

  const getMarkedDates = (shifts: ShiftData[], selectedDate: string) => {
    let marked: MarkedDates = {};
    shifts.forEach(({ date, shifts }) => {
      marked[date] = {
        marked: true,
        dots: shifts.map((shift, index) => ({
          key: `${date}-${index}`,
          color: shift.role === "Security" ? "red" : shift.role === "IT Support" ? "blue" : "green",
        }))
      };
    });
    if (selectedDate) {
      marked[selectedDate] = {
        ...(marked[selectedDate] || {}), // Preserve existing dots if present
        selected: true,
        selectedColor: "lightblue",
        dots: [...(marked[selectedDate]?.dots || [])]
      };
    }
    return marked;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CalendarProvider
          date={selectedDate}
          // onDateChanged={onDateChanged}
          // onMonthChange={onMonthChange}
          showTodayButton={false}
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
                markingType={"multi-dot"}
                onDayPress={(day: DateProps) => handleDatePress(day)}
                markedDates={markedDates}
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
