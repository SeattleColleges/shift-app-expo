import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {weekdays, months} from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from '@/constants/Colors'
import { useShiftNavigation } from "@/hooks/shift-navigation";

export default function ShiftDetailsPage () {
    const item = useLocalSearchParams();
    const colorScheme = useColorScheme() || 'light';

    const currentShiftId = parseInt(item.id as string);

    const { currentShift, goToPreviousShift, goToNextShift } = useShiftNavigation(currentShiftId);

    const date = currentShift ? new Date(currentShift.date) : new Date();

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
    type ShiftDetailItemProps = {
        title: string;
        value: any;
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
    const ShiftDetailItem = ({title, value}: ShiftDetailItemProps) => {

        return (
            <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
                <Text style={{fontSize:12}}>{title}:</Text>
                <Text style={{fontSize:16}}>{value}</Text>
            </View>
        )
    }
    return (
        <ThemedView style={styles.container}>
            <View style={styles.dateHeader}>
                <PressableIcon name={'arrow-back'} onPress={goToPreviousShift} />
                <ThemedText type={'default'}>{formattedDate}</ThemedText>
                <PressableIcon name={'arrow-forward'} onPress={goToNextShift} />
            </View>
            <ThemedView style={styles.detailsContainer}>
                <Text style={{alignSelf: 'center', fontWeight:'500', fontSize: 18}}>
                    Shift Details
                </Text>
                <ShiftDetailItem title={'Hours Scheduled'} value={item.numHoursScheduled}/>
                <ShiftDetailItem title={'Time'} value={`${item.startTime} - ${item.endTime}`}/>
                <ShiftDetailItem title={'Role'} value={item.role}/>
                <ShiftDetailItem title={'Building'} value={`${item.building} - ${item.roomNumber}`}/>
                <ShiftDetailItem title={'Supervisor'} value={''}/>
                <ShiftDetailItem title={'Coworkers'} value={''}/>
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
        gap: 18
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