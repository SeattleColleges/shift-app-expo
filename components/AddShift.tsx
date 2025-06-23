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
import { Picker } from "@react-native-picker/picker";
import { supabase } from "@/lib/supabaseClient";

const primaryColor = "#0056b3";
const cardBackgroundColor = "#fff";

type PickerType = "startTime" | "endTime" | "startDate" | "endDate" | null;

interface User {
  profile_int_id: number;
  name: string;
  email: string;
}

interface Supervisor {
  supervisor_id: number;
  profiles: {
    name: string;
    email: string;
  };
}

// Helper function to round time to nearest quarter-hour
const roundToNearestQuarter = (date: Date): Date => {
  const minutes = date.getMinutes();
  const remainder = minutes % 15;

  // Round up to next quarter-hour
  const roundedDate = new Date(date);
  if (remainder > 0) {
    roundedDate.setMinutes(minutes + (15 - remainder));
  }
  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);

  return roundedDate;
};

const AddShift: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(roundToNearestQuarter(new Date()));
  const [endTime, setEndTime] = useState<Date>(
      roundToNearestQuarter(new Date(new Date().setHours(new Date().getHours() + 1)))
  );
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [currentPickerType, setCurrentPickerType] = useState<PickerType>(null);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<number | null>(null);

  // Fetch users and supervisors
  useEffect(() => {
    fetchUsers();
    fetchSupervisors();
  }, []);

  const fetchUsers = async () => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_int_id, name, email')
        .order('name');
      
      if (error) {
        console.error('Error fetching users:', error);
        return;
      }
      
      if (data) {
        setUsers(data);
        // Set first user as default if available
        if (data.length > 0 && !selectedUserId) {
          setSelectedUserId(data[0].profile_int_id);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const fetchSupervisors = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_int_id, name, email')
        .eq('role', 'supervisor')
        .order('name');

      if (error) {
        console.error('Error fetching supervisors:', error);
        return;
      }

      if (data) {
        const supervisorsData = data.map(profile => ({
          supervisor_id: profile.profile_int_id,
          profiles: {
            name: profile.name,
            email: profile.email,
          },
        }));

        setSupervisors(supervisorsData as Supervisor[]);
        
        if (supervisorsData.length > 0 && !selectedSupervisorId) {
          setSelectedSupervisorId(supervisorsData[0].supervisor_id);
        }
      }
    } catch (error) {
      console.error('Error fetching supervisors:', error);
    }
  };

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
    if (startDateTime > endDateTime) {
      return false;
    } else {
      return true;
    }
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
          adjustedDate = roundToNearestQuarter(selectedDate);
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
  const handleAddShift = async () => {
    console.log("Add Shift button pressed");

    // Validate times before adding shift
    if (!validateShiftTimes()) {
      setError("Error: Start time cannot be after end time");
      console.error("Validation error: Start time is after end time");
      Alert.alert(
          "Invalid Shift Times",
          "Start time cannot be after end time",
          [{ text: "OK" }]
      );
      return;
    }

    // Validate user selection
    if (!selectedUserId) {
      setError("Error: Please select a user");
      Alert.alert(
          "No User Selected",
          "Please select a user to assign the shift to.",
          [{ text: "OK" }]
      );
      return;
    }

    // Validate supervisor selection
    if (!selectedSupervisorId) {
      setError("Error: Please select a supervisor");
      Alert.alert(
          "No Supervisor Selected",
          "Please select a supervisor for the shift.",
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

    try {
      if (!supabase) {
        throw new Error('Supabase client is not available');
      }

      const slotStart = shiftStart.toISOString();
      const slotEnd = shiftEnd.toISOString();
      const slot = `[${slotStart},${slotEnd})`;

      // Save shift
      const { data, error } = await supabase
        .from('shifts')
        .insert({
          shift_name: `Shift ${shiftStart.toLocaleDateString()}`,
          assigned_user_id: selectedUserId,
          department_id: 1, // TODO: Change default later. Maybe only have option on form if multiple exist
          supervisor_id: selectedSupervisorId,
          slot: slot,
          needs_coverage: false,
          notes: ''
        })
        .select();

      if (error) {
        console.error('Error adding shift:', error);
        Alert.alert(
            "Error",
            "Failed to add shift. Please try again.",
            [{ text: "OK" }]
        );
        return;
      }

      console.log("Shift added successfully:", data);

      // Show confirmation to user
      Alert.alert(
          "Success",
          "Shift added successfully!",
          [{ text: "OK" }]
      );

    } catch (error) {
      console.error('Error adding shift:', error);
      Alert.alert(
          "Error",
          "Failed to add shift. Please try again.",
          [{ text: "OK" }]
      );
    }
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Add Shift</Text>

            {/* Display error message if present */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Employee selector */}
            <Text style={styles.label}>Assign to User</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedUserId}
                onValueChange={(itemValue) => setSelectedUserId(itemValue)}
                style={styles.picker}
              >
                {users.map((user) => (
                  <Picker.Item
                    key={user.profile_int_id}
                    label={user.name || user.email}
                    value={user.profile_int_id}
                  />
                ))}
              </Picker>
            </View>

            {/* Supervisor selector */}
            <Text style={styles.label}>Assign to Supervisor</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSupervisorId}
                onValueChange={(itemValue) => setSelectedSupervisorId(itemValue)}
                style={styles.picker}
              >
                {supervisors.map((supervisor) => (
                  <Picker.Item
                    key={supervisor.supervisor_id}
                    label={supervisor.profiles.name || supervisor.profiles.email}
                    value={supervisor.supervisor_id}
                  />
                ))}
              </Picker>
            </View>

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
  scrollContainer: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
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