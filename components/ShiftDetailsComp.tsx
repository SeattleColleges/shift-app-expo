import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SHIFT_DETAIL_DATA } from "../data/shiftDetailData";

export default function ShiftDetailsComp() {
  const renderItem = ({ item }) => (
    <View style={styles.detailsCard}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.detailText}>Time: {item.time}</Text>
      <Text style={styles.detailText}>Hours scheduled: {item.hoursScheduled}</Text>
      <Text style={styles.detailText}>Name: {item.name}</Text>
      <Text style={styles.detailText}>Role: {item.role}</Text>
      <Text style={styles.detailText}>Supervisor: {item.supervisor}</Text>
      <Text style={styles.detailText}>
        Coworkers: {item.coworkers.join(", ")}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.giveUpButton}>
          <Text style={styles.giveUpButtonText}>Give up shift</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.takeShiftButton}>
          <Text style={styles.takeShiftButtonText}>Take shift</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SHIFT_DETAIL_DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  detailsCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  giveUpButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  giveUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  takeShiftButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  takeShiftButtonText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});