import type React from "react";
import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DropDownPicker from 'react-native-dropdown-picker';


const primaryColor = "#0056b3";
const cardBackgroundColor = "#fff";

type PickerType = "startTime" | "endTime" | "startDate" | "endDate" | null;
type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;

const timePickerMinuteInterval:MinuteInterval = 15 // Changes interval rounding and picker display values

// Helper function to round time to nearest minute interval
const roundToNearestInterval = (date: Date, minuteInterval:number): Date => {

  const minutes = date.getMinutes();
  const remainder = minutes % minuteInterval;

  // Round up to next minute interval
  const roundedDate = new Date(date);
  if (remainder > 0) {
    roundedDate.setMinutes(minutes + (minuteInterval - remainder));
  }
  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);

  return roundedDate;
};

const AddShift: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(roundToNearestInterval(new Date(),timePickerMinuteInterval));
  const [endTime, setEndTime] = useState<Date>(
      roundToNearestInterval(new Date(new Date().setHours(new Date().getHours() + 1)), timePickerMinuteInterval)
  );
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [currentPickerType, setCurrentPickerType] = useState<PickerType>(null);
  const [error, setError] = useState<string | null>(null);
  // Drop down picker states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'AD Tutor', value: 'AD Tutor'},
    {label: 'Food Court Cashier', value: 'Food Court Cashier'}
  ]);


  // Format date to human readable format (e.g., "Monday, January 1, 2025")
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time without seconds (e.g., "14:30" or "2:30 PM")
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true // Use 12-hour format with AM/PM
    });
  };

  // Function to validate if start time is before end time
  const validateShiftTimes = () => {
    // Create full date-time objects by combining the date and time
    const startDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
    );

    const endDateTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
    );

    // Check if start time is after end time
    return startDateTime <= endDateTime;
  };

  // Validate shift times whenever they change
  useEffect(() => {
    validateShiftTimes();
  }, [startDate, endDate, startTime, endTime]);

  const onChange = useCallback(
      (event: DateTimePickerEvent, selectedDate?: Date) => {
        // Always close the picker first to prevent re-opening issues
        setShowPicker(false);
        setCurrentPickerType(null);

        // On Android, canceling returns undefined
        if (!selectedDate) {
          return;
        }

        // For times, round to nearest quarter-hour
        let adjustedDate = selectedDate;

        if (currentPickerType === "startTime" || currentPickerType === "endTime") {
          adjustedDate = roundToNearestInterval(selectedDate,timePickerMinuteInterval);
        }

        if (currentPickerType === "startDate") {
          setStartDate(adjustedDate);
          console.log("Start date changed:", formatDate(adjustedDate));
        }
        if (currentPickerType === "endDate") {
          setEndDate(adjustedDate);
          console.log("End date changed:", formatDate(adjustedDate));
        }
        if (currentPickerType === "startTime") {
          setStartTime(adjustedDate);
          console.log("Start time changed:", formatTime(adjustedDate));
        }
        if (currentPickerType === "endTime") {
          setEndTime(adjustedDate);
          console.log("End time changed:", formatTime(adjustedDate));
        }
      },
      [currentPickerType]
  );

  // Function to handle adding a shift
  const handleAddShift = () => {
    console.log("Add Shift button pressed");

    // Validate times before adding shift
    if (!validateShiftTimes()) {
      setError("Error: Start time cannot be after end time");
      //console.error("Validation error: Start time is after end time");
      Alert.alert(
          "Invalid Shift Times",
          "Start time cannot be after end time",
          [{ text: "OK" }]
      );
      return;
    }

    // Clear any previous error
    setError(null);

    // Create full date-time objects for the shift
    const shiftStart = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
    );

    const shiftEnd = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
    );

    // Format the shift times in the required format
    const formattedShiftStart = `${formatDate(shiftStart)} ${formatTime(shiftStart)}`;
    const formattedShiftEnd = `${formatDate(shiftEnd)} ${formatTime(shiftEnd)}`;

    // Log the shift details in the requested format
    console.log("==== Creating New Shift ====");
    console.log(`Shift added: { '${formattedShiftStart}', '${formattedShiftEnd}' }`);
    console.log("Duration (hours):", (shiftEnd.getTime() - shiftStart.getTime()) / (1000 * 60 * 60));
    console.log("========================");

    /* Here you would typically call an API or dispatch an action to save the shift
    For now, we're just logging to terminal */

    // Show confirmation to user
    Alert.alert(
        "Success",
        "Shift added successfully!",
        [{ text: "OK" }]
    );
  };

  // Android requires a different approach for the date picker
  const renderDateTimePicker = () => {


    if (!showPicker) return null;

    const pickerMode = currentPickerType?.includes("Date") ? "date" : "time";
    let pickerValue;

    switch (currentPickerType) {
      case "startDate":
        pickerValue = startDate;
        break;
      case "endDate":
        pickerValue = endDate;
        break;
      case "startTime":
        pickerValue = startTime;
        break;
      case "endTime":
        pickerValue = endTime;
        break;
      default:
        pickerValue = new Date();
    }

    return (
        <>
          {Platform.OS === 'android' ? (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={pickerValue}
                  mode={pickerMode}
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
              />
          ) : (
              <Modal transparent animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={pickerValue}
                        mode={pickerMode}
                        is24Hour={false}
                        display="spinner"
                        onChange={onChange}
                        minuteInterval={timePickerMinuteInterval}
                    />
                    <TouchableOpacity
                        onPress={() => {
                          setShowPicker(false);
                          setCurrentPickerType(null);
                        }}
                        style={styles.modalCloseButton}
                    >
                      <Text style={styles.modalCloseText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
          )}
        </>
    );
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
      >
        {/* Position Drop down*/}
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a Position"/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Add Shift</Text>

            {/* Display error message if present */}
            {error && <Text style={styles.errorText}>{error}</Text>}

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
            <TouchableOpacity style={styles.primaryButton} onPress={handleAddShift}>
              <Text style={styles.primaryButtonText}>Add Shift</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Render DateTimePicker based on platform */}
        {renderDateTimePicker()}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContainer: { flexGrow: 1, alignItems: "center", marginTop: 20 },
  innerContainer: {
    width: "100%",
    padding: 24,
    borderRadius: 12,
    backgroundColor: cardBackgroundColor,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
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
  errorText: { color: "red", marginBottom: 10 },
});

export default AddShift;