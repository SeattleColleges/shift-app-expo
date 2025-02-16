import {SafeAreaView, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function ShiftDetailsPage () {
    const item = useLocalSearchParams()
    console.log("item", item)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>{item.title}</Text>
            <Text>{item.role}</Text>
            <Text>{item.building}: {item.roomNumber}</Text>
            <Text>{item.date}</Text>
            <Text>{item.startTime} - {item.endTime}</Text>
        </SafeAreaView>
    )
}

