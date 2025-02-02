import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  TextInput, 
  TouchableOpacity 
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Works for iOS & Android

type DateTimePickerMode = "date" | "time";

const AddSchedule: React.FC = () => {
  const [role, setRole] = useState<string>("AD400 tutor");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(""); // Store selected time as string for Web
  const [mode, setMode] = useState<DateTimePickerMode>("date");
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>("Select a date");
  const [timeText, setTimeText] = useState<string>("Select a time");
  const [location, setLocation] = useState<string>("BE 101");
  const [notes, setNotes] = useState<string>("");

  // Function to handle date change (for iOS/Android)
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    let formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    setText(formattedDate);
  };

  // Function to handle time change (for iOS/Android)
  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }
    const currentTime = selectedTime || date;
    setShow(false);
    setDate(currentTime);

    let formattedTime = `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`;
    setTimeText(formattedTime);
  };

  // Function for Web Date Input
  const handleWebDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Function for Web Time Input
  const handleWebTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
    setTimeText(event.target.value);
  };

  // Function to show picker
  const showMode = (currentMode: DateTimePickerMode) => {
    setMode(currentMode);
    setShow(true);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Add Schedule</Text>

        <Text style={styles.label}>Role</Text>
        <RNPickerSelect
          onValueChange={(value) => setRole(value)}
          items={[
            { label: "AD400 tutor", value: "AD400 tutor" },
            { label: "CS430 tutor", value: "CS430 tutor" },
            { label: "AD420 tutor", value: "AD420 tutor" },
          ]}
          value={role}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
            placeholder: { color: "#ccc" },
          }}
          placeholder={{
            label: "Select a role...",
            value: null,
          }}
        />

        {/* Date Picker Section */}
        <Text style={styles.selectedDate}>{text}</Text>
        <View style={styles.buttonContainer}>
          {Platform.OS === "web" ? (
            <input 
              type="date" 
              onChange={handleWebDateChange} 
              value={text} 
              style={styles.webInput}
            />
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => showMode("date")}>
              <Text style={styles.buttonText}>📅 Pick a Date</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Time Picker Section */}
        <Text style={styles.selectedDate}>{timeText}</Text>
        <View style={styles.buttonContainer}>
          {Platform.OS === "web" ? (
            <input 
              type="time" 
              onChange={handleWebTimeChange} 
              value={time} 
              style={styles.webInput}
            />
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => showMode("time")}>
              <Text style={styles.buttonText}>⏰ Pick a Time</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ✅ Native DateTimePicker for Android & iOS */}
        {Platform.OS !== "web" && show && mode === "date" && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        {Platform.OS !== "web" && show && mode === "time" && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        {/* ✅ Modal DateTimePicker for iOS & Android */}
        <DateTimePickerModal
          isVisible={show && Platform.OS !== "web"}
          mode={mode}
          onConfirm={(selectedDate) => {
            if (mode === "date") {
              setDate(selectedDate);
              setText(`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
            } else {
              let formattedTime = `${selectedDate.getHours().toString().padStart(2, "0")}:${selectedDate.getMinutes().toString().padStart(2, "0")}`;
              setTimeText(formattedTime);
            }
            setShow(false);
          }}
          onCancel={() => setShow(false)}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          multiline
        />
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
  selectedDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  webInput: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default AddSchedule;
