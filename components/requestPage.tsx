import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    Platform,
} from "react-native";
import DatePickerComponent from "./DatePickerComponent";
import showAlert from "./showAlert";
import CustomDropdown from "./CustomDropdown"; // Import the new CustomDropdown

const { width } = Dimensions.get("window");

// Define the hours off options with your specific choices
const hoursOffOptions = [
    { label: "Full Day", value: "Full Day" },
    { label: "Half Day", value: "Half Day" },
    { label: "1 Hour", value: "1 Hour" },
    { label: "2 Hours", value: "2 Hours" },
    { label: "3 Hours", value: "3 Hours" },
    { label: "4 Hours", value: "4 Hours" },
    { label: "5 Hours", value: "5 Hours" },
    { label: "6 Hours", value: "6 Hours" },
    { label: "7 Hours", value: "7 Hours" },
    { label: "8 Hours", value: "8 Hours" },
];

const RequestPage = () => {
    const [fullName, setFullName] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [hoursOff, setHoursOff] = useState<string>(""); // hoursOff will now be a string
    const [reason, setReason] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = () => {
        let errors: string[] = [];

        if (!fullName) {
            errors.push("Full Name is required.");
        }
        if (!startDate) {
            errors.push("Start Date is required.");
        }
        if (!endDate) {
            errors.push("End Date is required.");
        }
        if (startDate && endDate && startDate > endDate) {
            errors.push("Start Date cannot be after End Date.");
        }
        // Validation for hoursOff (now a custom dropdown)
        if (!hoursOff) {
            errors.push("Hours Off selection is required.");
        }
        if (!reason) {
            errors.push("Reason is required.");
        }

        if (errors.length > 0) {
            setErrorMessage(errors.join("\n"));
            return;
        }

        setErrorMessage(null); // Clear any previous errors
        showAlert(
            "Request Submitted",
            "Your time-off request has been submitted and is awaiting approval from your supervisor."
        );
        // Optionally, reset form fields after successful submission:
        // setFullName('');
        // setStartDate(new Date());
        // setEndDate(new Date());
        // setHoursOff(''); // Reset to empty string for the placeholder
        // setReason('');
    };

    const isFormValid = fullName && startDate && endDate && hoursOff && reason;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Time Off</Text>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

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

            <DatePickerComponent label="Start Date" date={startDate} setDate={setStartDate} />
            <DatePickerComponent label="End Date" date={endDate} setDate={setEndDate} />

            {/* Use the new CustomDropdown component with your desired options */}
            <CustomDropdown
                label="Hours Off"
                options={hoursOffOptions} // This is where your choices are passed
                selectedValue={hoursOff}
                onValueChange={setHoursOff}
                placeholder="Select hours off" // Custom placeholder text
            />

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

            <TouchableOpacity
                style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!isFormValid}
            >
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
    submitButtonDisabled: {
        backgroundColor: "#ccc",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        marginBottom: 20,
        fontSize: 16,
        textAlign: "center",
    },
});

export default RequestPage;