import React from "react";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Link} from "expo-router";
import {setAMOrPM, to12Hours} from "@/util/dateUtils";
import {ShiftDetail} from "@/types/ShiftDetail";

interface DayViewItemProps {
    item: ShiftDetail,
}

export const DayViewItem = ({item}: DayViewItemProps) => {
    const start = Number(item.startTime.split(':')[0]);
    const end = Number(item.endTime.split(':')[0]);
    const startFormatted = `${to12Hours(start)}${setAMOrPM(start)}`
    const endFormatted = `${to12Hours(end)}${setAMOrPM(end)}`
    return (
        <Link
            key={item.id}
            style={{width:'100%'}}
            href={{
                // CORRECTED LINE: Specify the route file path, not the dynamic value here
                pathname: `./shift-details-page/[id]`, // This matches your file: app/(tabs)/shift-details-page/[id].tsx
                params: {
                    id: item.id, // Pass the actual ID as a param
                    assignedUser: item.assignedUser,
                    departmentId: item.departmentId,
                    supervisorId: item.supervisorId,
                    title: item.title,
                    date: item.date,
                    startTime: startFormatted,
                    endTime: endFormatted,
                    duration: item.duration,
                    needsCoverage: Number(item.needsCoverage),
                    coverageReason: item.coverageReason,
                    notes: item.notes,
                    createdOn: item.createdOn,
                }
            }}>
        <ThemedView style={{width:'100%'}}>
            <ThemedView lightColor={'#CFD8DC'} darkColor={'#CFD8DC'} style={{
                marginBottom: 10,
                width: '70%',
                padding: 10,
                paddingLeft: 20,
                borderRadius: 20
            }}>
                <ThemedText style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 12, color: '#3e3e3e'}}>
                    <ThemedText>{item.title}: </ThemedText>
                </ThemedText>
                <ThemedText style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 16, marginVertical: 4}}>
                    <ThemedText style={{fontWeight: 'bold'}}>{Math.floor(item.duration / 60)} HR</ThemedText>
                    <ThemedText> | {`${startFormatted} - ${endFormatted}`}</ThemedText>
                </ThemedText>
            </ThemedView>
        </ThemedView>
        </Link>
    )
}