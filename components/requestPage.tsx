import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
} from "react-native";

const { width } = Dimensions.get("window");

const RequestPage = () => {
    const [fullName, setFullName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hoursOff, setHoursOff] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        if (!fullName || !startDate || !endDate || !hoursOff || !reason) {
            Alert.alert("Error", "Please fill out all fields before submitting.");
            return;
        }
        Alert.alert("Request Submitted", "Your time-off request has been submitted.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Time Off</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#888"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Start Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#888"
                    value={startDate}
                    onChangeText={setStartDate}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>End Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#888"
                    value={endDate}
                    onChangeText={setEndDate}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Hours Off</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter hours off"
                    placeholderTextColor="#888"
                    value={hoursOff}
                    onChangeText={setHoursOff}
                    keyboardType="numeric"
                />
            </View>

            <View style={[styles.inputContainer, styles.reasonContainer]}>
                <Text style={styles.label}>Reason</Text>
                <TextInput
                    style={[styles.input, styles.reasonInput]}
                    placeholder="Enter reason"
                    placeholderTextColor="#888"
                    value={reason}
                    onChangeText={setReason}
                    multiline
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: width > 400 ? 32 : 28,
        fontWeight: "normal",
        marginBottom: 20,
    },
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
    input: {
        width: "100%",
        height: width > 400 ? 50 : 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    reasonContainer: {
        marginBottom: 30,
    },
    reasonInput: {
        height: 80,
        textAlignVertical: "top",
    },
    submitButton: {
        width: "85%",
        maxWidth: 400,
        height: width > 400 ? 50 : 45,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RequestPage;