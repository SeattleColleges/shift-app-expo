import {Pressable, ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
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
import {durationFormat} from "@/data/utils";
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

    const item  = JSON.parse(params.data);
     const currentUserIsAssignedUser = currentUserId == item.assigned_user_id;
     const colorScheme = useColorScheme() || 'light';
     const date =  new Date(item.startDateObj);
     const day = date.getDate();
     const month = months()[date.getMonth()];
     const dayOfWeek = weekdays()[date.getDay()];
    const formattedDate = `${dayOfWeek}, ${month} ${day}`;
     const [isSupervisor, setIsSupervisor] = useState<boolean | null>(false);

    useEffect(() => {
        setIsSupervisor(item.role === 'supervisor');
    }, [item.role]);

     type PressableIconProps = {
         name: keyof typeof Ionicons.glyphMap;
         size?: number;
         onPress:() => void
     };
    type ShiftRequestButtonProps = {
         text: string; onPress: () => void;
     }

     const ShiftRequestButton = ({text, onPress}: ShiftRequestButtonProps) => {
         return (
             <Pressable onPress={onPress} style={[styles.button, {backgroundColor: Colors[colorScheme].text,}]}><Text style={{color: colorScheme == 'light' ? Colors.dark.text: Colors.light.text}}>
                     {text}
                 </Text>
             </Pressable>
         )
     }
     // @ts-ignore
    const ShiftDetailItem = ({title, value}) => {
        return (
            <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
               <Text style={{fontSize:12}}>{title}:</Text>
                 <Text style={{fontSize:16}}>{value}</Text>
            </View>
        )
     }

    return (
        <ScrollView>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.detailsContainer}>
                    <ThemedText type={'default'}>{formattedDate}</ThemedText>
                    <ShiftDetailItem title={'Assigned User ID'} value={item.assigned_user_id} />
                    <ShiftDetailItem title={'Profile Name'} value={item.profile_name} />
                    <ShiftDetailItem title={'Department ID'} value={item.department_id} />
                    <ShiftDetailItem title={'Supervisor ID'} value={item.supervisor_id}/>
                    <ShiftDetailItem title={'Supervisor Name:'} value={item.super_name}/>
                    <ShiftDetailItem title={'Title'} value={item.shift_name}/>

                    <ShiftDetailItem title={'Hours Scheduled'} value={durationFormat(item.duration)}/>
                    <ShiftDetailItem title={'Needs Coverage'} value={item.needsCoverage ? 'Yes':'No'}/>
                    <ShiftDetailItem title={'Coverage Reason'} value={item.coverageRdurationFormateason}/>
                    <ShiftDetailItem title={'Time'} value={`${new Date(item.startDateObj).toISOString()} - ${new Date(item.endDateObj).toISOString()}`}/>
                    <ShiftDetailItem title={'Notes'} value={item.notes || 'None' } />
                </ThemedView>
                {
                    currentUserIsAssignedUser && item.shift_change_data !== null &&
                    <ThemedView style={{flexDirection: 'row', gap: 25}}>
                        <ShiftRequestButton onPress={() => console.log('give up shift')} text={'GIVE UP SHIFT'}/>
                        <ShiftRequestButton onPress={() => console.log('take shift')} text={'TAKE SHIFT'}/>
                    </ThemedView>
                }
                {
                    isSupervisor && !currentUserIsAssignedUser &&
                    <ThemedView style={{flexDirection: 'row', gap: 25}}>
                        <ShiftRequestButton onPress={() => console.log('approve')} text={'APPROVE'}/>
                        <ShiftRequestButton onPress={() => console.log('deny')} text={'DENY'}/>
                    </ThemedView>
                }
                <View>
                    <Text>{JSON.stringify(item,null, 2)}</Text>
                </View>
            </ThemedView>
        </ScrollView>

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
        gap: 18,
        marginTop: 30
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