import { useRouter } from "expo-router";
import { Platform, Alert } from "react-native";
import { shiftData, ShiftData } from "@/data/dummyShiftData";

export const useShiftNavigation = (currentShiftId: number) => {
  const router = useRouter();
  
  const currentShift = shiftData.find(shift => shift.id === currentShiftId);
  
  const allDates = [...new Set(shiftData.map(shift => shift.date))].sort();
  
  const currentDateIndex = allDates.indexOf(currentShift?.date || "");
  
  const findShiftOnDate = (date: string): ShiftData | undefined => {
    return shiftData.find(shift => shift.date === date);
  };
  
  const showAlert = (title: string, message: string): void => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };
  
  const goToPreviousShift = () => {
    if (currentDateIndex > 0) {
      const prevDate = allDates[currentDateIndex - 1];
      const prevShift = findShiftOnDate(prevDate);
      
      if (prevShift) {
        router.setParams({
          id: prevShift.id.toString(),
          date: prevShift.date,
          startTime: prevShift.startTime,
          endTime: prevShift.endTime,
          role: prevShift.role,
          building: prevShift.building,
          roomNumber: prevShift.roomNumber
        });
      }
    } else {
      showAlert("No previous shifts available", "You're reached the beginning of your scheduled shifts.");
    }
  };
  
  const goToNextShift = () => {
    if (currentDateIndex < allDates.length - 1) {
      const nextDate = allDates[currentDateIndex + 1];
      const nextShift = findShiftOnDate(nextDate);
      
      if (nextShift) {
        router.setParams({
          id: nextShift.id.toString(),
          date: nextShift.date,
          startTime: nextShift.startTime,
          endTime: nextShift.endTime,
          role: nextShift.role,
          building: nextShift.building,
          roomNumber: nextShift.roomNumber
        });
      }
    } else {
      showAlert("No more shifts available", "You've reached the end of your scheduled shifts.");
    }
  };
  
  return {
    currentShift,
    goToPreviousShift,
    goToNextShift
  };
};