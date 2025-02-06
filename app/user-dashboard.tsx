import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList} from 'react-native';
import { supabase } from '@/supabaseClient';
import {OptionToggle} from "@/components/dashboard/OptionToggle";
import { AgendaList, Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import {shiftData, ShiftData} from "@/data/dummyShiftData";
import {MarkedDates} from "react-native-calendars/src/types";
import {DayViewItem} from "@/components/DayViewItem";

interface DateProps {
  dateString: string,
  day: number,
  month: number,
  timestamp: number,
  year: number,
}
interface AgendaListProps {
  title: string,
  data: any[]
}
export default function UserDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>();
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>(new Intl.DateTimeFormat('en-CA').format(new Date()));
  const [markedDates, setMarkedDates] = useState({});
  const [agendaListItems, setAgendaListItems] = useState<any[]>([]);
  useEffect(() => {
    let items: AgendaListProps[] = [];
    shiftData.forEach(shift => {
      const existing = items.findIndex(item => item.title === shift.date);
      const shiftItem = {
        startTime: shift.startTime,
        endTime: shift.endTime,
        role: shift.role,
        roomNumber: shift.roomNumber,
        building: shift.building,
        title: "Shift"
      }
      if (existing === -1) {
        items.push({
          title: shift.date,
          data: [...[shiftItem]],
        })
      } else {
        items[existing].data.push(shiftItem);
      }
    })
    setAgendaListItems(items);
  }, []);
  useEffect(() => {
    // console.log(selectedApprovalStatus);
  }, [selectedApprovalStatus]);
  useEffect(() => {
    // console.log(selectedTimeframe);
  }, [selectedTimeframe]);

  const handleDatePress = (date: DateProps) => {
    setSelectedDate(date.dateString);
  }

  useEffect(() => {
    setMarkedDates(getMarkedDates(shiftData, selectedDate));
  }, [selectedDate]);

  const getMarkedDates = (shifts: ShiftData[], selectedDate: string) => {
    let marked: MarkedDates = {};
    shifts.forEach(({ date, id,  role }) => {
      if (!marked[date]) {
        marked[date] = {
          marked: true,
          dots: [{
            key: `${date}-${id}`,
            color: 'black'
          }]
        };
      } else {
        marked[date].dots?.push({
          key: `${date}-${id}`,
          color: 'black'
        })
      }
    });
    if (selectedDate) {
      marked[selectedDate] = {
        ...(marked[selectedDate] || {}),
        selected: true,
        selectedColor: "lightblue",
        dots: [...(marked[selectedDate]?.dots || [])]
      };
    }
    return marked;
  };
  const renderItem = useCallback(({item}: any) => {
    return <DayViewItem item={item}/>
  }, []);
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
              <WeekCalendar
                markingType={'multi-dot'}
                onDayPress={(day: DateProps) => handleDatePress(day)}
                markedDates={markedDates}
              />
      }
      <AgendaList
          sections={agendaListItems}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 50}}
      />
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
