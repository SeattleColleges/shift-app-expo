import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const INITIAL_STATE = {
  role: "AD Tutor",
  date: new Date(),
  startTime: "12:00 pm",
  endTime: "4:00 pm",
  location: "BE 101",
  notes: "",
};

const AddSchedule: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setState({ ...state, date: selectedDate });
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
  };

  const handleAddShift = () => {
    console.log(state);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Add Schedule</Text>

        <Text style={styles.label}>Role</Text>
        <TextInput
          style={styles.input}
          value={state.role}
          onChangeText={(value) => handleInputChange("role", value)}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={state.date.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={state.date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Start time</Text>
        <TextInput
          style={styles.input}
          value={state.startTime}
          onChangeText={(value) => handleInputChange("startTime", value)}
        />

        <Text style={styles.label}>End time</Text>
        <TextInput
          style={styles.input}
          value={state.endTime}
          onChangeText={(value) => handleInputChange("endTime", value)}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={state.location}
          onChangeText={(value) => handleInputChange("location", value)}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={state.notes}
          onChangeText={(value) => handleInputChange("notes", value)}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleAddShift}>
          <Text style={styles.buttonText}>Add Shift</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  innerContainer: {
    width: 400,
    maxWidth: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#000", // Black background
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddSchedule;