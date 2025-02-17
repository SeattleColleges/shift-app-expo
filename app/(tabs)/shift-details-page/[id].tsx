import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";

export default function ShiftDetailsPage () {
    const item = useLocalSearchParams()
    return (
        <ThemedView style={styles.container}>
            <View style={styles.detailsContainer}>
                <ThemedText style={{marginBottom: 10, alignSelf: 'center'}} type={'subtitle'}>
                    Shift Details
                </ThemedText>
                <Text>Hours Scheduled: </Text>
                <Text>Time: {item.startTime} - {item.endTime}</Text>
                <Text>Role: {item.role}</Text>
                <Text>Building: {item.building}: {item.roomNumber}</Text>
                <Text>{item.date}</Text>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    detailsContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderRadius: 20,
        height: 300,
        width: 300,
        backgroundColor: "#eee",
        padding: 10,
        gap: 20
    },
    heading: {
        textAlign: "center",
        paddingBottom: 20,
    },
    text: {
        paddingBottom: 10,
    },
})