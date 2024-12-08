import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";

const RequestPage = () => {
    // State variables for the form fields
    const [fullName, setFullName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hoursOff, setHoursOff] = useState("");
    const [reason, setReason] = useState("");

    // Handler for the Submit button
    const handleSubmit = () => {
        if (!fullName || !startDate || !endDate || !hoursOff || !reason) {
            Alert.alert(
                "Error",
                "Please fill out all fields before submitting."
            );
            return;
        }
        // Submit
        Alert.alert(
            "Request Submitted",
            "Your time-off request has been submitted."
        );
    };

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Request Time Off</Text>

            {/* Form Fields */}
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Start Date (YYYY-MM-DD)"
                value={startDate}
                onChangeText={setStartDate}
            />
            <TextInput
                style={styles.input}
                placeholder="End Date (YYYY-MM-DD)"
                value={endDate}
                onChangeText={setEndDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Hours Off"
                value={hoursOff}
                onChangeText={setHoursOff}
                keyboardType="numeric"
            />
            <TextInput
                style={[styles.input, styles.reasonInput]}
                placeholder="Reason"
                value={reason}
                onChangeText={setReason}
                multiline={true}
            />

            {/* Submit Button */}
            <View style={styles.button}>
                <Button title="Submit Request" onPress={handleSubmit} />
            </View>
        </View>
    );
};

// Styles
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
    input: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#ffffff",
    },
    reasonInput: {
        height: 80,
        textAlignVertical: "top",
    },
    button: {
        marginTop: 20,
    },
});

export default RequestPage;
