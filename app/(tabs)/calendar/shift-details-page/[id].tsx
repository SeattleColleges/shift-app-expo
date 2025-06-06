import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Stack, useFocusEffect, useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {weekdays, months} from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from '@/constants/Colors'
import { useShiftNavigation } from "@/hooks/shift-navigation";
import {ShiftDetail} from "@/types/ShiftDetail";
import {useCallback, useEffect, useState} from "react";
import {supabaseAdmin} from "@/lib/supabaseAdminClient";
const isShiftDetail = (obj: any): obj is ShiftDetail => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.assignedUser === 'string' &&
        typeof obj.departmentId === 'string' &&
        typeof obj.supervisorId === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.date === 'string' &&
        typeof obj.startTime === 'string' &&
        typeof obj.endTime === 'string' &&
        typeof obj.duration === 'string' &&
        typeof obj.needsCoverage === 'string' &&
        typeof obj.createdOn === 'string' &&
        (typeof obj.coverageReason === 'undefined' || typeof obj.coverageReason === 'string') &&
        (typeof obj.notes === 'undefined' || typeof obj.notes === 'string')
    );
}
const currentUserId = 3; // Change me to test role privileges
export default function ShiftDetailsPage () {
    const params = useLocalSearchParams();
    // if (!isShiftDetail(params)) {
    //     throw new Error('Invalid shift detail parameters');
    // }
    const item  = JSON.parse(params.data);
    // const currentUserIsAssignedUser = currentUserId == item.assignedUser;
    // const colorScheme = useColorScheme() || 'light';
    // const { currentShift, goToPreviousShift, goToNextShift } = useShiftNavigation(item.id);
    // const date = currentShift ? new Date(currentShift.date) : new Date();
    // const day = date.getDate();
    // const month = months()[date.getMonth()];
    // const dayOfWeek = weekdays()[date.getDay()];
    // const formattedDate = `${dayOfWeek}, ${month} ${day}`;
    // const [isSupervisor, setIsSupervisor] = useState<boolean | null>(false);
    // type PressableIconProps = {
    //     name: keyof typeof Ionicons.glyphMap;
    //     size?: number;
    //     onPress:() => void
    // };
    // type ShiftRequestButtonProps = {
    //     text: string;
    //     onPress: () => void;
    // }
    // type ShiftDetailItemProps = {
    //     title: string;
    //     value: any;
    // }
    // const PressableIcon = ({name, size = 20, onPress}: PressableIconProps) => {
    //     return (
    //         <Pressable onPress={onPress}>
    //             <Ionicons
    //                 size={size}
    //                 name={name}
    //                 color={Colors[colorScheme].text}
    //             />
    //         </Pressable>
    //     )
    // }
    // const ShiftRequestButton = ({text, onPress}: ShiftRequestButtonProps) => {
    //     return (
    //         <Pressable onPress={onPress} style={[styles.button, {backgroundColor: Colors[colorScheme].text,}]}>
    //             <Text style={{color: colorScheme == 'light' ? Colors.dark.text: Colors.light.text}}>
    //                 {text}
    //             </Text>
    //         </Pressable>
    //     )
    // }
    // const ShiftDetailItem = ({title, value}: ShiftDetailItemProps) => {
    //     return (
    //         <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
    //             <Text style={{fontSize:12}}>{title}:</Text>
    //             <Text style={{fontSize:16}}>{value}</Text>
    //         </View>
    //     )
    // }

    useFocusEffect(
        useCallback(() => {
            async function fetchRole() {
                if (!supabaseAdmin) throw new Error('Supabase admin is invalid.');
                const { data, error } = await supabaseAdmin.rpc('is_supervisor', { supervisor_id_param: currentUserId });
                if (error) {
                    console.error(error);
                   // setIsSupervisor(false);
                } else {
                   // setIsSupervisor(data);
                }
            }
            fetchRole();
            return () => {
                console.log('Shift details page unfocused');
               // setIsSupervisor(false);
            };
        }, [])
    );
    useEffect(() => {
      //  console.log(isSupervisor)
    }, []);
    return (
        <>
            <ThemedView style={styles.container}>
                <View>
                    <Text>Shift Details</Text>
                    <Text>{JSON.stringify(item,null, 2)}</Text>
                </View>
                {/*<View style={styles.dateHeader}>*/}
                {/*    <PressableIcon name={'arrow-back'} onPress={goToPreviousShift} />*/}
                {/*    <ThemedText type={'default'}>{formattedDate}</ThemedText>*/}
                {/*    <PressableIcon name={'arrow-forward'} onPress={goToNextShift} />*/}
                {/*</View>*/}
                {/*<ThemedView style={styles.detailsContainer}>*/}
                {/*    <Text style={{alignSelf: 'center', fontWeight:'500', fontSize: 18}}>*/}
                {/*        Shift Details*/}
                {/*    </Text>*/}
                {/*    <ShiftDetailItem title={'Assigned User'} value={item.assignedUser} />*/}
                {/*    <ShiftDetailItem title={'Department ID'} value={item.departmentId} />*/}
                {/*    <ShiftDetailItem title={'Supervisor ID'} value={item.supervisorId}/>*/}
                {/*    <ShiftDetailItem title={'Title'} value={item.title}/>*/}
                {/*    <ShiftDetailItem title={'Date'} value={item.date}/>*/}
                {/*    <ShiftDetailItem title={'Hours Scheduled'} value={Math.floor(item.duration / 60)}/>*/}
                {/*    <ShiftDetailItem title={'Needs Coverage'} value={item.needsCoverage}/>*/}
                {/*    <ShiftDetailItem title={'Coverage Reason'} value={item.coverageReason}/>*/}
                {/*    <ShiftDetailItem title={'Time'} value={`${item.startTime} - ${item.endTime}`}/>*/}
                {/*    <ShiftDetailItem title={'Notes'} value={item.notes} />*/}
                {/*</ThemedView>*/}
                {/*{*/}
                {/*    currentUserIsAssignedUser &&*/}
                {/*    <ThemedView style={{flexDirection: 'row', gap: 25}}>*/}
                {/*        <ShiftRequestButton onPress={() => console.log('give up shift')} text={'GIVE UP SHIFT'}/>*/}
                {/*        <ShiftRequestButton onPress={() => console.log('take shift')} text={'TAKE SHIFT'}/>*/}
                {/*    </ThemedView>*/}
                {/*}*/}
                {/*{*/}
                {/*    isSupervisor && !currentUserIsAssignedUser &&*/}
                {/*    <ThemedView style={{flexDirection: 'row', gap: 25}}>*/}
                {/*        <ShiftRequestButton onPress={() => console.log('approve')} text={'APPROVE'}/>*/}
                {/*        <ShiftRequestButton onPress={() => console.log('deny')} text={'DENY'}/>*/}
                {/*    </ThemedView>*/}
                {/*}*/}
            </ThemedView>
        </>

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