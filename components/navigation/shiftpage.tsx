import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ShiftDetailPage = () => {
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Shift Details</Text>

            {/* Placeholder Box */}
            <View style={styles.placeholderBox}>
                <Text style={styles.placeholderText}>
                    Shift Detail Component Placeholder
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
};

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
    placeholderBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 16,
        color: "#aaaaaa",
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

export default ShiftDetailPage;
