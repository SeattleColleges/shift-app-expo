import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {weekdays, months} from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from '@/constants/Colors'

export default function ShiftDetailsPage () {
    const item = useLocalSearchParams();
    const colorScheme = useColorScheme() || 'light';
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
    type ShiftRequestButtonProps = {
        text: string;
        onPress: () => void;
    }
    const PressableIcon = ({name, size = 20, onPress}: PressableIconProps) => {
        return (
            <Pressable onPress={onPress}>
                <Ionicons
                    size={size}
                    name={name}
                    color={Colors[colorScheme].text}
                />
            </Pressable>
        )
    }
    const ShiftRequestButton = ({text, onPress}: ShiftRequestButtonProps) => {
        return (
            <Pressable onPress={onPress} style={[styles.button, {backgroundColor: Colors[colorScheme].text,}]}>
                <Text style={{color: colorScheme == 'light' ? Colors.dark.text: Colors.light.text}}>
                    {text}
                </Text>
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
            <ThemedView style={styles.detailsContainer}>
                <Text style={{alignSelf: 'center', fontWeight:'500', fontSize: 18}}>
                    Shift Details
                </Text>
                <Text>Hours Scheduled: {item.numHoursScheduled}</Text>
                <Text>Time: {item.startTime} - {item.endTime}</Text>
                <Text>Role: {item.role}</Text>
                <Text>Building: {item.building} - {item.roomNumber}</Text>
                <Text>Supervisor: </Text>
                <Text>Coworkers: </Text>
            </ThemedView>
            <ThemedView style={{flexDirection: 'row', gap: 25}}>
                <ShiftRequestButton onPress={() => console.log('give up shift')} text={'GIVE UP SHIFT'}/>
                <ShiftRequestButton onPress={() => console.log('take shift')} text={'TAKE SHIFT'}/>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 50
    },
    detailsContainer: {
        alignItems: "flex-start",
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
    },
    button: {
        padding: 12,
        borderRadius: 5
    }
})