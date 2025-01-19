import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { View, Text, StyleSheet, Button } from "react-native";
import { SHIFT_DETAIL_DATA } from "../data/shiftDetailData";

export default function ShiftDetailsComp() {
  // For demonstration, we’ll use the first shift as an example.
  const shift = SHIFT_DETAIL_DATA[0];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Shift Details</Text>

      {/* Shift Information */}
      <View style={styles.shiftDetails}>
        <Text style={styles.detailText}>Date: {shift.date}</Text>
        <Text style={styles.detailText}>Time: {shift.time}</Text>
        <Text style={styles.detailText}>Hours Scheduled: {shift.hoursScheduled}</Text>
        <Text style={styles.detailText}>Name: {shift.name}</Text>
        <Text style={styles.detailText}>Role: {shift.role}</Text>
        <Text style={styles.detailText}>Supervisor: {shift.supervisor}</Text>
        <Text style={styles.detailText}>
          Coworkers: {shift.coworkers.join(", ")}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Give Up Shift"
            onPress={() => alert("Give Up Shift clicked")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Take Shift"
            onPress={() => alert("Take Shift clicked")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  shiftDetails: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
