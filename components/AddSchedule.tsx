import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { roles } from "../data/roles"; // Import the roles data
import { locations } from "../data/locations"; // Import the locations data
import { times } from "../data/times"; // Import the times data

type DateTimePickerMode = "date" | "time";

const AddSchedule: React.FC = () => {
  const [role, setRole] = useState<string>(roles[0].value);
  const [location, setLocation] = useState<string>(locations[0].value);
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("Select start time");
  const [endTime, setEndTime] = useState<string>("Select end time");
  const [mode, setMode] = useState<DateTimePickerMode>("date");
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>("Select a date");
  const [currentPicker, setCurrentPicker] = useState<"start" | "end">("start");
  const [notes, setNotes] = useState<string>("");
  const [showRolePicker, setShowRolePicker] = useState<boolean>(false);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);

  const onChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setShow(false);
      return;
    }
  
    setDate(selectedDate); // Update the date state
  
    // Format the date properly
    const formattedDate = `${selectedDate.getDate()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;
  
    setText(formattedDate); // Update the visible date text
    setShow(false); // Close the modal after selection
  };
  

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (!selectedTime) {
      setShow(false);
      return;
    }
    const currentTime = selectedTime || date;
    setShow(false);

    const formattedTime = `${currentTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    if (currentPicker === "start") {
      setStartTime(formattedTime);
    } else {
      setEndTime(formattedTime);
    }
  };

  const handleAddShift = () => {
    // Handle the add shift logic here
    console.log("Shift added");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Add Schedule</Text>

          {/* Role Picker */}
          <Text style={styles.label}>Role</Text>
          {Platform.OS === "web" ? (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.webInput} // Apply the same style as Date
            >
              {roles.map((roleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </option>
              ))}
            </select>
          ) : Platform.OS === "ios" || Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                style={styles.button} // Apply the same style as Date
                onPress={() => setShowRolePicker(true)}
              >
                <Text style={styles.buttonText}>{role}</Text>
              </TouchableOpacity>

              <Modal visible={showRolePicker} transparent animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={role}
                      onValueChange={(itemValue) => setRole(itemValue)}
                      style={styles.picker}
                    >
                      {roles.map((roleOption) => (
                        <Picker.Item
                          key={roleOption.value}
                          label={roleOption.label}
                          value={roleOption.value}
                        />
                      ))}
                    </Picker>
                    <TouchableOpacity
                      onPress={() => setShowRolePicker(false)}
                      style={styles.modalCloseButton}
                    >
                      <Text style={styles.modalCloseText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
              >
                {roles.map((roleOption) => (
                  <Picker.Item
                    key={roleOption.value}
                    label={roleOption.label}
                    value={roleOption.value}
                  />
                ))}
              </Picker>
            </View>
          )}

          {/* Date Picker */}
          <Text style={styles.label}>Date</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={text}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                setDate(selectedDate);
                setText(e.target.value);
              }}
              style={styles.webInput}
            />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setMode("date");
                setShow(true);
              }}
            >
              <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
          )}

          {/* iOS-specific DateTimePicker */}
          {Platform.OS === "ios" && show && (
            <Modal transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.pickerWrapper}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChange} // Use the updated function
                    textColor="#000" // Ensure visibility in dark mode
                  />
                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => setShow(false)}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          {/* Native Android Picker (unchanged) */}
          {Platform.OS === "android" && show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          {/* Start Time Picker */}
          <Text style={styles.label}>Start Time</Text>
          {Platform.OS === "web" ? (
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={styles.webInput}
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          ) : Platform.OS === "ios" || Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.buttonText}>{startTime}</Text>
              </TouchableOpacity>

              <Modal visible={showStartTimePicker} transparent animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={startTime}
                      onValueChange={(itemValue) => setStartTime(itemValue)}
                      style={styles.picker}
                    >
                      {times.map((time) => (
                        <Picker.Item key={time} label={time} value={time} />
                      ))}
                    </Picker>
                    <TouchableOpacity
                      onPress={() => setShowStartTimePicker(false)}
                      style={styles.modalCloseButton}
                    >
                      <Text style={styles.modalCloseText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={startTime}
                onValueChange={(itemValue) => setStartTime(itemValue)}
                style={styles.picker}
              >
                {times.map((time) => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
              </Picker>
            </View>
          )}

          {/* End Time Picker */}
          <Text style={styles.label}>End Time</Text>
          {Platform.OS === "web" ? (
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={styles.webInput}
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          ) : Platform.OS === "ios" || Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={styles.buttonText}>{endTime}</Text>
              </TouchableOpacity>

              <Modal visible={showEndTimePicker} transparent animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={endTime}
                      onValueChange={(itemValue) => setEndTime(itemValue)}
                      style={styles.picker}
                    >
                      {times.map((time) => (
                        <Picker.Item key={time} label={time} value={time} />
                      ))}
                    </Picker>
                    <TouchableOpacity
                      onPress={() => setShowEndTimePicker(false)}
                      style={styles.modalCloseButton}
                    >
                      <Text style={styles.modalCloseText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={endTime}
                onValueChange={(itemValue) => setEndTime(itemValue)}
                style={styles.picker}
              >
                {times.map((time) => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
              </Picker>
            </View>
          )}

          {/* Location Picker */}
          <Text style={styles.label}>Location</Text>
          {Platform.OS === "web" ? (
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.webInput}
            >
              {locations.map((locationOption) => (
                <option key={locationOption.value} value={locationOption.value}>
                  {locationOption.label}
                </option>
              ))}
            </select>
          ) : Platform.OS === "ios" || Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowLocationPicker(true)}
              >
                <Text style={styles.buttonText}>{location}</Text>
              </TouchableOpacity>

              <Modal visible={showLocationPicker} transparent animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={location}
                      onValueChange={(itemValue) => setLocation(itemValue)}
                      style={styles.picker}
                    >
                      {locations.map((locationOption) => (
                        <Picker.Item
                          key={locationOption.value}
                          label={locationOption.label}
                          value={locationOption.value}
                        />
                      ))}
                    </Picker>
                    <TouchableOpacity
                      onPress={() => setShowLocationPicker(false)}
                      style={styles.modalCloseButton}
                    >
                      <Text style={styles.modalCloseText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={location}
                onValueChange={(itemValue) => setLocation(itemValue)}
                style={styles.picker}
              >
                {locations.map((locationOption) => (
                  <Picker.Item
                    key={locationOption.value}
                    label={locationOption.label}
                    value={locationOption.value}
                  />
                ))}
              </Picker>
            </View>
          )}

          {/* Notes Input */}
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Add Shift Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddShift}
          >
            <Text style={styles.buttonText}>Add Shift</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 20,
  },
  picker: {
    height: Platform.OS === "ios" ? 150 : 50,
    width: "100%",
    color: "#333",
    backgroundColor: "transparent",
  },
  webPicker: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "100%",
  },
  pickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    alignItems: "center",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalCloseButton: {
    marginTop: 10,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 18,
    color: "#007bff",
  },
  webInput: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "92%",
  },
  pickerWrapper: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButton: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  doneButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddSchedule;