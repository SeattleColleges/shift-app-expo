import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList, SectionList} from 'react-native';
import { supabase } from '@/supabaseClient';
import {OptionToggle} from "@/components/dashboard/OptionToggle";
import {AgendaList, Calendar, CalendarContext, CalendarProvider, DateData, WeekCalendar} from "react-native-calendars";
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
const getMarkedDates = (shifts: ShiftData[], selectedDate: string) => {
  let marked: MarkedDates = {};
  shifts.forEach(({ date, id }) => {
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

  marked[selectedDate] = {
    ...(marked[selectedDate] || {}),
    selected: true,
    dots: [...(marked[selectedDate]?.dots || [])]
  }

  return marked;
};
export default function UserDashboard() {
  const timeframeOptions = ['Month', 'Week'];
  const approvalStatusOptions = ['Pending', 'Approved', 'Denied'];
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>(timeframeOptions[0]);
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState<string | undefined>(approvalStatusOptions[0]);
  const [selectedDate, setSelectedDate] = useState<string>(new Intl.DateTimeFormat('en-CA').format(new Date()));
  const [agendaListItems, setAgendaListItems] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>();

  useEffect(() => {
    initializeAgendaItems();
  }, []);

  useEffect(() => {
    setMarkedDates(getMarkedDates(shiftData, selectedDate))
  }, [selectedDate]);

  const initializeAgendaItems = () => {
    const items: AgendaListProps[] = [];
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
  }

  const isDateInCurrentWeek = (dateStr: string): boolean => {
    const inputDate = new Date(dateStr);
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return inputDate >= startOfWeek && inputDate <= endOfWeek;
  }
  const handleDatePress = (date: DateProps) => {
    setSelectedDate(date.dateString);
  }
  const renderItem = useCallback(({item}: any) => {
    return <DayViewItem item={item}/>
  }, []);
  const agendaRef = useRef<SectionList>(null);
  const scrollToEvent = (dateIndex: number, itemIndex: number) => {
    if (agendaRef.current) {
      agendaRef.current.scrollToLocation({
        sectionIndex: dateIndex,
        itemIndex: itemIndex,
        animated: true,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <CalendarProvider
          date={selectedDate}
          onDateChanged={setSelectedDate}
          showTodayButton={false}
      >
      {/* Schedule Title*/}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Schedule</Text>
        <OptionToggle
            options={timeframeOptions}
            gap={8}
            handleToggledOption={setSelectedTimeframe}
        />
        <OptionToggle
            options={approvalStatusOptions}
            gap={4}
            handleToggledOption={setSelectedApprovalStatus}
        />
      </View>
      {
        selectedTimeframe === "Month" ?
            (
              <Calendar
                enableSwipeMonths={true}
                markingType={"multi-dot"}
                onDayPress={(day: DateProps) => handleDatePress(day)}
                markedDates={markedDates}
              />
            )
            : (
              <WeekCalendar
                markingType={'multi-dot'}
                enableSwipeMonths={false}
                onDayPress={(day: DateProps) => handleDatePress(day)}
                markedDates={markedDates}
                current={selectedDate}
                initialDate={selectedDate}
              />
            )
      }
      <AgendaList
          ref={agendaRef}
          sections={selectedTimeframe === 'Month' ?
              agendaListItems :
              agendaListItems.filter(item => {
            return isDateInCurrentWeek(item.title);
          })}
          renderItem={renderItem}
          onLayout={() => scrollToEvent(0,0)}
          contentContainerStyle={{paddingBottom: 50}}
          infiniteListProps={{
            itemHeight: 110,
            titleHeight: 50,
            visibleIndicesChangedDebounce: 250,
          }}
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
