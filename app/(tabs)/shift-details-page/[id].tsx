import {Pressable, StyleSheet, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {weekdays, months} from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ShiftDetailsPage () {
    const item = useLocalSearchParams();
    const date = new Date(item.date as string) || new Date()
    const day = date.getDate();
    const month = months()[date.getMonth()];
    const dayOfWeek = weekdays()[date.getDay()];
    const formattedDate = `${dayOfWeek}, ${month} ${day}`
    type PressableIconProps = {
        name: keyof typeof Ionicons.glyphMap;
        size?: number;
        onPress:() => void
    };
    const PressableIcon = ({name, size = 20, onPress}: PressableIconProps) => {
        return (
            <Pressable onPress={onPress}>
                <Ionicons
                    size={size}
                    name={name}
                />
            </Pressable>
        )
    }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.dateHeader}>
                <PressableIcon name={'arrow-back'} onPress={() => console.log('prev')} />
                <ThemedText type={'default'}>{formattedDate}</ThemedText>
                <PressableIcon name={'arrow-forward'} onPress={() => console.log('next')} />
            </View>
            <View style={styles.detailsContainer}>
                <ThemedText style={{alignSelf: 'center'}} type={'subtitle'}>
                    Shift Details
                </ThemedText>
                <Text>Hours Scheduled: {item.numHoursScheduled}</Text>
                <Text>Time: {item.startTime} - {item.endTime}</Text>
                <Text>Role: {item.role}</Text>
                <Text>Building: {item.building} - {item.roomNumber}</Text>
                <Text>Supervisor: </Text>
                <Text>Coworkers: </Text>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    detailsContainer: {
        alignItems: "flex-start",
        top: 50,
        borderRadius: 10,
        width: 300,
        backgroundColor: "#eee",
        padding: 15,
        paddingBottom: 20,
        gap: 20
    },
    dateHeader: {
        alignItems:'center',
        height: 80,
        width: "75%",
        flexDirection:'row',
        justifyContent:'space-around'
    }
})