import type React from "react";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";

const primaryColor = "#0056b3";
const cardBackgroundColor = "#fff";
const textColor = "#343a40";

type PickerType = "startTime" | "endTime" | "startDate" | "endDate" | null;

const AddShift: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [currentPickerType, setCurrentPickerType] = useState<PickerType>(null);

  const formatDate = (date: Date): string => date.toLocaleDateString();
  const formatTime = (date: Date): string => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const onChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        if (currentPickerType === "startDate") setStartDate(selectedDate);
        if (currentPickerType === "endDate") setEndDate(selectedDate);
        if (currentPickerType === "startTime") setStartTime(selectedDate);
        if (currentPickerType === "endTime") setEndTime(selectedDate);
      }
      setShowPicker(false);
      setCurrentPickerType(null);
    },
    [currentPickerType]
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Add Shift</Text>

          {/* Start Date */}
          <Text style={styles.label}>Start Date</Text>
          <Pressable
            style={styles.inputButton}
            onPress={() => {
              setShowPicker(true);
              setCurrentPickerType("startDate");
            }}
          >
            <Text style={styles.inputText}>{formatDate(startDate)}</Text>
          </Pressable>

          {/* Start Time */}
          <Text style={styles.label}>Start Time</Text>
          <Pressable
            style={styles.inputButton}
            onPress={() => {
              setShowPicker(true);
              setCurrentPickerType("startTime");
            }}
          >
            <Text style={styles.inputText}>{formatTime(startTime)}</Text>
          </Pressable>

          {/* End Date */}
          <Text style={styles.label}>End Date</Text>
          <Pressable
            style={styles.inputButton}
            onPress={() => {
              setShowPicker(true);
              setCurrentPickerType("endDate");
            }}
          >
            <Text style={styles.inputText}>{formatDate(endDate)}</Text>
          </Pressable>

          {/* End Time */}
          <Text style={styles.label}>End Time</Text>
          <Pressable
            style={styles.inputButton}
            onPress={() => {
              setShowPicker(true);
              setCurrentPickerType("endTime");
            }}
          >
            <Text style={styles.inputText}>{formatTime(endTime)}</Text>
          </Pressable>

          {/* Add Shift Button */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Add Shift</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* DateTimePicker Modal */}
      {showPicker && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={
                  currentPickerType === "startDate" || currentPickerType === "endDate"
                    ? startDate
                    : startTime
                }
                mode={currentPickerType?.includes("Date") ? "date" : "time"}
                display="default"
                onChange={onChange}
              />
              <Pressable onPress={() => setShowPicker(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContainer: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  innerContainer: {
    width: "100%",
    padding: 24,
    borderRadius: 12,
    backgroundColor: cardBackgroundColor,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  inputButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  inputText: { fontSize: 16 },
  primaryButton: {
    backgroundColor: primaryColor,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, padding: 20, borderRadius: 8, backgroundColor: cardBackgroundColor },
  modalCloseButton: { marginTop: 10, alignItems: "center" },
  modalCloseText: { fontSize: 16, color: primaryColor },
});

export default AddShift;