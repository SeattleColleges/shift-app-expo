import type React from "react";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";

// Define a more subtle color palette
const primaryColor = "#0056b3"; // A darker, less vibrant blue
const secondaryColor = "#6c757d";
const backgroundColor = "#f8f9fa";
const cardBackgroundColor = "#fff";
const textColor = "#343a40";
const shadowColor = "#000";

type PickerType = "startTime" | "endTime" | "startDate" | "endDate" | null;

const AddShift: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [currentTimePickerType, setCurrentTimePickerType] = useState<PickerType>(null);
  const [isAddingShift, setIsAddingShift] = useState<boolean>(false);

  const formatDate = (dateObject: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateObject: Date): string => {
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const roundToQuarterHour = useCallback((date: Date): Date => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / 15) * 15;
    date.setMinutes(roundedMinutes, 0, 0); // Set seconds and milliseconds to 0
    return date;
  }, []);

  const onChangeDate = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      if (currentTimePickerType === "startDate") {
        setStartDate(selectedDate);
      } else if (currentTimePickerType === "endDate") {
        setEndDate(selectedDate);
      }
    }
    setShowDatePicker(false);
    setCurrentTimePickerType(null);
  }, [currentTimePickerType]);

  const onChangeTime = useCallback((event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      const roundedTime = roundToQuarterHour(selectedTime);
      if (currentTimePickerType === "startTime") {
        setStartTime(roundedTime);
      } else if (currentTimePickerType === "endTime") {
        setEndTime(roundedTime);
      }
    }
    setShowTimePicker(false);
    setCurrentTimePickerType(null);
  }, [currentTimePickerType, roundToQuarterHour]);

  const handleAddShift = () => {
    // Combine start date and time, and end date and time
    const combinedStartDateTime = new Date(startDate);
    combinedStartDateTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

    const combinedEndDateTime = new Date(endDate);
    combinedEndDateTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    // Validate the shift duration
    if (combinedEndDateTime <= combinedStartDateTime) {
      alert("End date and time cannot be before or equal to start date and time.");
      return;
    }

    setIsAddingShift(true);

    // Format the date and times
    const formattedStartDate = formatDate(combinedStartDateTime);
    const formattedStartTime = formatTime(combinedStartDateTime);
    const formattedEndDate = formatDate(combinedEndDateTime);
    const formattedEndTime = formatTime(combinedEndDateTime);

    // Log the shift data
    const dummyData = `{ '${formattedStartDate} ${formattedStartTime}', '${formattedEndDate} ${formattedEndTime}' }`;
    console.log("Shift added:", dummyData);

    // Simulate adding the shift
    setTimeout(() => {
      setIsAddingShift(false);
      // You might want to add a confirmation message or navigation here
    }, 500);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={[styles.innerContainer, { backgroundColor: cardBackgroundColor, shadowColor }]}>
          <Text style={[styles.title, { color: textColor }]}>Add Shift</Text>

          {/* Start Date Picker */}
          <Text style={[styles.label, { color: textColor }]}>Start Date</Text>
          <Pressable style={styles.inputButton} onPress={() => { setShowDatePicker(true); setCurrentTimePickerType("startDate"); }}>
            <Text style={[styles.inputText, { color: textColor }]}>{formatDate(startDate)}</Text>
          </Pressable>

          {/* Start Time Picker */}
          <Text style={[styles.label, { color: textColor }]}>Start Time</Text>
          <Pressable style={styles.inputButton} onPress={() => { setShowTimePicker(true); setCurrentTimePickerType("startTime"); }}>
            <Text style={[styles.inputText, { color: textColor }]}>{formatTime(startTime)}</Text>
          </Pressable>

          {/* End Date Picker */}
          <Text style={[styles.label, { color: textColor }]}>End Date</Text>
          <Pressable style={styles.inputButton} onPress={() => { setShowDatePicker(true); setCurrentTimePickerType("endDate"); }}>
            <Text style={[styles.inputText, { color: textColor }]}>{formatDate(endDate)}</Text>
          </Pressable>

          {/* End Time Picker */}
          <Text style={[styles.label, { color: textColor }]}>End Time</Text>
          <Pressable style={styles.inputButton} onPress={() => { setShowTimePicker(true); setCurrentTimePickerType("endTime"); }}>
            <Text style={[styles.inputText, { color: textColor }]}>{formatTime(endTime)}</Text>
          </Pressable>

          {/* Add Shift Button */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: primaryColor }, isAddingShift && styles.primaryButtonPressed]}
            onPress={handleAddShift}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{isAddingShift ? "Adding..." : "Add Shift"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && Platform.OS !== "web" && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: cardBackgroundColor }]}>
              <DateTimePicker
                value={currentTimePickerType === "startDate" ? startDate : endDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
              <Pressable onPress={() => setShowDatePicker(false)} style={styles.modalCloseButton}>
                <Text style={[styles.modalCloseText, { color: primaryColor }]}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      {/* Time Picker Modal */}
      {showTimePicker && Platform.OS !== "web" && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: cardBackgroundColor }]}>
              <DateTimePicker
                value={currentTimePickerType === "startTime" ? startTime : endTime}
                mode="time"
                display="spinner"
                onChange={onChangeTime}
              />
              <Pressable onPress={() => setShowTimePicker(false)} style={styles.modalCloseButton}>
                <Text style={[styles.modalCloseText, { color: primaryColor }]}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

// Enhanced Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContainer: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  innerContainer: {
    width: 400,
    maxWidth: "100%",
    padding: 24,
    borderRadius: 12,
    elevation: 5, // Subtle shadow for Android
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  label: { fontSize: 16, marginBottom: 8 },
  inputButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  inputText: { fontSize: 16 },
  primaryButton: {
    backgroundColor: primaryColor, // Using the updated primaryColor
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    elevation: 3,
  },
  primaryButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  primaryButtonPressed: {
    opacity: 0.8,
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  modalContent: {
    width: 320,
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  modalCloseButton: { marginTop: 16, alignItems: "center" },
  modalCloseText: { fontSize: 18, fontWeight: "bold" },
});

export default AddShift;