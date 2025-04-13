import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, SectionList } from "react-native";
import { OptionToggle } from "@/components/dashboard/OptionToggle";
import {
  AgendaList,
  Calendar,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import { shiftData, ShiftData } from "@/data/dummyShiftData";
import { MarkedDates } from "react-native-calendars/src/types";
import { DayViewItem } from "@/components/DayViewItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface DateProps {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
interface AgendaListProps {
  title: string;
  data: any[];
}
enum Timeframes {
  Week = "Week",
  Month = "Month",
}
const getMarkedDates = (shifts: ShiftData[], selectedDate: string) => {
  let marked: MarkedDates = {};
  shifts.forEach(({ date, id }) => {
    if (!marked[date]) {
      marked[date] = {
        marked: true,
        dots: [
          {
            key: `${date}-${id}`,
            color: "black",
          },
        ],
      };
    } else {
      marked[date].dots?.push({
        key: `${date}-${id}`,
        color: "black",
      });
    }
  });

  marked[selectedDate] = {
    ...(marked[selectedDate] || {}),
    selected: true,
    dots: [...(marked[selectedDate]?.dots || [])],
  };

  return marked;
};
export default function UserDashboard() {
  const today = new Intl.DateTimeFormat("en-CA").format(new Date());
  const timeframeOptions = [Timeframes.Month, Timeframes.Week];
  const approvalStatusOptions = ["Pending", "Approved", "Denied"];
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    Timeframes | undefined
  >(timeframeOptions[0]);
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState<
    string | undefined
  >(approvalStatusOptions[0]);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [agendaListItems, setAgendaListItems] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>();

  useEffect(() => {
    initializeAgendaItems();
  }, []);

  useEffect(() => {
    setMarkedDates(getMarkedDates(shiftData, selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTimeframe === Timeframes.Week) {
      setSelectedDate(today);
    }
  }, [selectedTimeframe]);
  const initializeAgendaItems = () => {
    const items: AgendaListProps[] = [];
    shiftData.forEach((shift) => {
      const existing = items.findIndex((item) => item.title === shift.date);
      const shiftItem = {
        id: shift.id,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
        role: shift.role,
        roomNumber: shift.roomNumber,
        building: shift.building,
        title: "Shift",
      };
      if (existing === -1) {
        items.push({
          title: shift.date,
          data: [...[shiftItem]],
        });
      } else {
        items[existing].data.push(shiftItem);
      }
    });
    setAgendaListItems(items);
  };

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
  };
  const handleDatePress = (date: DateProps) => {
    setSelectedDate(date.dateString);
  };

  const renderItem = useCallback(({ item }: any) => {
    return <DayViewItem item={item} />;
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
    <ThemedView style={{ flex: 1 }}>
      <CalendarProvider
        date={selectedDate}
        onDateChanged={setSelectedDate}
        showTodayButton={false}
      >
        {/* Schedule Title*/}
        <ThemedView style={styles.scheduleContainer}>
          <ThemedText style={styles.scheduleTitle}>Schedule</ThemedText>
          <OptionToggle
            options={timeframeOptions.map((tf) => tf.toString())}
            gap={8}
            handleToggledOption={(value) =>
              setSelectedTimeframe(
                value === Timeframes.Month.toString()
                  ? Timeframes.Month
                  : Timeframes.Week
              )
            }
          />
          <OptionToggle
            options={approvalStatusOptions}
            gap={4}
            handleToggledOption={setSelectedApprovalStatus}
          />
        </ThemedView>
        {selectedTimeframe === Timeframes.Month ? (
          <Calendar
            enableSwipeMonths={true}
            markingType={"multi-dot"}
            onDayPress={(day: DateProps) => handleDatePress(day)}
            markedDates={markedDates}
          />
        ) : (
          <WeekCalendar
            markingType={"multi-dot"}
            enableSwipeMonths={false}
            onDayPress={(day: DateProps) => handleDatePress(day)}
            markedDates={markedDates}
            current={selectedDate}
            initialDate={today}
          />
        )}
        <AgendaList
          ref={agendaRef}
          sections={
            selectedTimeframe === Timeframes.Month
              ? agendaListItems
              : agendaListItems.filter((item) => {
                  return isDateInCurrentWeek(item.title);
                })
          }
          avoidDateUpdates={selectedTimeframe === Timeframes.Week}
          renderItem={renderItem}
          onLayout={() => scrollToEvent(0, 0)}
          contentContainerStyle={{ paddingBottom: 50 }}
          infiniteListProps={{
            itemHeight: 115,
            titleHeight: 45,
            visibleIndicesChangedDebounce: 250,
          }}
        />
      </CalendarProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    margin: 16,
    alignItems: "center",
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
