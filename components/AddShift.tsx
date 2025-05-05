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

type PickerType = "startTime" | "endTime" | null;

const AddShift: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [currentTimePickerType, setCurrentTimePickerType] = useState<"start" | "end" | null>(null);
  const [isAddingShift, setIsAddingShift] = useState<boolean>(false);

  const onChangeDate = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  }, []);

  const onChangeTime = useCallback((event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      if (currentTimePickerType === "start") {
        setStartTime(selectedTime);
      } else if (currentTimePickerType === "end") {
        setEndTime(selectedTime);
      }
    }
    setShowTimePicker(false);
    setCurrentTimePickerType(null);
  }, [currentTimePickerType]);

  const formatDate = (dateObject: Date): string => {
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateObject: Date): string => {
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}+00`;
  };

  const handleAddShift = () => {
    setIsAddingShift(true);
    const formattedDate = formatDate(date);
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    const dummyData = `{ '${formattedDate} ${formattedStartTime}', '${formattedDate} ${formattedEndTime}' }`;
    console.log("Shift added:", dummyData);
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

          {/* Date Picker */}
          <Text style={[styles.label, { color: textColor }]}>Date</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={formatDate(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
              style={styles.webInput}
            />
          ) : (
            <Pressable style={styles.inputButton} onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.inputText, { color: textColor }]}>{formatDate(date)}</Text>
            </Pressable>
          )}
          {showDatePicker && (
            <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
          )}

          {/* Start Time Picker */}
          <Text style={[styles.label, { color: textColor }]}>Start Time</Text>
          <Pressable style={styles.inputButton} onPress={() => { setShowTimePicker(true); setCurrentTimePickerType("start"); }}>
            <Text style={[styles.inputText, { color: textColor }]}>{formatTime(startTime).split('+')[0]}</Text>
          </Pressable>

          {/* End Time Picker */}
          <Text style={[styles.label, { color: textColor }]}>End Time</Text>
          <Pressable style={styles.inputButton} onPress={() => { setShowTimePicker(true); setCurrentTimePickerType("end"); }}>
            <Text style={[styles.inputText, { color: textColor }]}>{formatTime(endTime).split('+')[0]}</Text>
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

      {/* Time Picker Modal */}
      {showTimePicker && Platform.OS !== "web" && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: cardBackgroundColor }]}>
              <DateTimePicker
                value={currentTimePickerType === "start" ? startTime : endTime}
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
  webInput: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
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