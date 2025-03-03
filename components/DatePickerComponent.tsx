import React, { useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerComponentProps {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ label, date, setDate }) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "85%",
    maxWidth: 400,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  button: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  webInput: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
});

export default DatePickerComponent;