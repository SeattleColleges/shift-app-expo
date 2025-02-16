import React from "react";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";

interface DayViewItemProps {
    item: any,
}

export const DayViewItem = ({item}: DayViewItemProps) => {
    const start = Number(item.startTime.split(':')[0]);
    const end = Number(item.endTime.split(':')[0]);
    const numHoursScheduled = end - start;
    const setAMOrPM = (time: number) => time >= 12 ? "pm" : 'am';
    const to12Hours = (time: number) =>  time > 12 ? time - 12 : time;
    return (
        <ThemedView style={{width:'100%'}}>
            <ThemedView lightColor={'#CFD8DC'} darkColor={'#CFD8DC'} style={{
                marginBottom: 10,
                width: '70%',
                padding: 10,
                paddingLeft: 20,
                borderRadius: 20
            }}>
                <ThemedText style={{fontSize: 16}}>{item.role}</ThemedText>
                <ThemedText style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 12, color: '#3e3e3e'}}>
                    <ThemedText>{item.building}: </ThemedText>
                    <ThemedText>{item.roomNumber}</ThemedText>
                </ThemedText>
                <ThemedText style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 16, marginVertical: 4}}>
                    <ThemedText style={{fontWeight: 'bold'}}>{numHoursScheduled} HR</ThemedText>
                    <ThemedText> | {`${to12Hours(start)}${setAMOrPM(start)} - ${to12Hours(end)}${setAMOrPM(end)}`}</ThemedText>
                    <ThemedText>{item.duration}</ThemedText>
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}