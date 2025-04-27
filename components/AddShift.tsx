import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { roles } from "../data/roles"; 
import { locations } from "../data/locations";
import { times } from "../data/times";

type PickerType = "role" | "location" | "startTime" | "endTime" | null;

const AddShift: React.FC = () => {
  const [role, setRole] = useState<string>(roles[0].value);
  const [location, setLocation] = useState<string>(locations[0].value);
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("Select start time");
  const [endTime, setEndTime] = useState<string>("Select end time");
  const [notes, setNotes] = useState<string>("");
  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState<string>("");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handlePickerChange = (value: string) => {
    setTempValue(value);
  };

  const handleDonePress = () => {
    if (activePicker === "role") setRole(tempValue);
    if (activePicker === "location") setLocation(tempValue);
    if (activePicker === "startTime") setStartTime(tempValue);
    if (activePicker === "endTime") setEndTime(tempValue);
    setActivePicker(null);
  };

  const handleAddShift = () => {
    console.log("Shift added:", { role, location, date, startTime, endTime, notes });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Add Shift</Text>

          {/* Role Picker */}
          <Text style={styles.label}>Role</Text>
          <Pressable style={styles.button} onPress={() => { setActivePicker("role"); setTempValue(role); }}>
            <Text style={styles.buttonText}>{role}</Text>
          </Pressable>

          {/* Date Picker */}
          <Text style={styles.label}>Date</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              style={styles.webInput}
            />
          ) : (
            <Pressable style={styles.button} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.buttonText}>{date.toDateString()}</Text>
            </Pressable>
          )}
          {showDatePicker && (
            <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
          )}

          {/* Start Time Picker */}
          <Text style={styles.label}>Start Time</Text>
          <Pressable style={styles.button} onPress={() => { setActivePicker("startTime"); setTempValue(startTime); }}>
            <Text style={styles.buttonText}>{startTime}</Text>
          </Pressable>

          {/* End Time Picker */}
          <Text style={styles.label}>End Time</Text>
          <Pressable style={styles.button} onPress={() => { setActivePicker("endTime"); setTempValue(endTime); }}>
            <Text style={styles.buttonText}>{endTime}</Text>
          </Pressable>

          {/* Location Picker */}
          <Text style={styles.label}>Location</Text>
          <Pressable style={styles.button} onPress={() => { setActivePicker("location"); setTempValue(location); }}>
            <Text style={styles.buttonText}>{location}</Text>
          </Pressable>

          {/* Notes Input */}
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Add Shift Button */}
          <Pressable style={styles.button} onPress={handleAddShift}>
            <Text style={styles.buttonText}>Add Shift</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Generic Picker Modal */}
      {activePicker && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={tempValue}
                onValueChange={handlePickerChange}
              >
                {(activePicker === "role"
                  ? roles
                  : activePicker === "location"
                  ? locations
                  : times.map((time) => ({ label: time, value: time }))
                ).map((item) =>
                  typeof item === "string" ? (
                    <Picker.Item key={item} label={item} value={item} />
                  ) : (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  )
                )}
              </Picker>
              <Pressable onPress={handleDonePress} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scrollContainer: { flexGrow: 1, alignItems: "center", padding: 16 },
  innerContainer: { width: 400, maxWidth: "100%", padding: 20, borderRadius: 12, backgroundColor: "#fff", elevation: 3 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, marginVertical: 8 },
  input: { fontSize: 16, padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "#fff", marginBottom: 10 },
  textArea: { height: 100, textAlignVertical: "top" },
  button: { paddingVertical: 12, borderRadius: 10, backgroundColor: "#000", alignItems: "center", marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  modalCloseButton: { marginTop: 10, alignItems: "center" },
  modalCloseText: { fontSize: 18, color: "#007bff" },
  webInput: { fontSize: 16, padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "#fff", marginBottom: 20, width: "92%" },
});

export default AddShift;