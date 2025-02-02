import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddSchedule: React.FC = () => {
  const [role, setRole] = useState("AD Tutor");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState("12:00 pm");
  const [endTime, setEndTime] = useState("4:00 pm");
  const [location, setLocation] = useState("BE 101");
  const [notes, setNotes] = useState("");

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleAddShift = () => {
    // Add your logic here
    console.log({ role, date, startTime, endTime, location, notes });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Schedule</Text>

      <Text style={styles.label}>Role</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Start time</Text>
      <TextInput style={styles.input} value={startTime} onChangeText={setStartTime} />

      <Text style={styles.label}>End time</Text>
      <TextInput style={styles.input} value={endTime} onChangeText={setEndTime} />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button title="Add Shift" onPress={handleAddShift} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
});

export default AddSchedule;
