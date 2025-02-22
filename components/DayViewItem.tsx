import React from "react";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Link} from "expo-router";

interface DayViewItemProps {
    item: any,
}

export const DayViewItem = ({item}: DayViewItemProps) => {
    const setAMOrPM = (time: number) => time >= 12 ? "pm" : 'am';
    const to12Hours = (time: number) =>  time > 12 ? time - 12 : time;
    const start = Number(item.startTime.split(':')[0]);
    const end = Number(item.endTime.split(':')[0]);
    const numHoursScheduled = end - start;
    const startFormatted = `${to12Hours(start)}${setAMOrPM(start)}`
    const endFormatted = `${to12Hours(end)}${setAMOrPM(end)}`
    return (
        <Link
            key={item.id}
            style={{width:'100%'}}
            href={{
                pathname: `./shift-details-page/${item.id}`,
                params: {
                    date: item.date,
                    startTime: startFormatted,
                    endTime: endFormatted,
                    role: item.role,
                    roomNumber: item.roomNumber,
                    building: item.building,
                    numHoursScheduled,
                    title: "Shift"
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
                <ThemedText style={{fontSize: 16}}>{item.role}</ThemedText>
                <ThemedText style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 12, color: '#3e3e3e'}}>
                    <ThemedText>{item.building}: </ThemedText>
                    <ThemedText>{item.roomNumber}</ThemedText>
                </ThemedText>
                <ThemedText style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 16, marginVertical: 4}}>
                    <ThemedText style={{fontWeight: 'bold'}}>{numHoursScheduled} HR</ThemedText>
                    <ThemedText> | {`${startFormatted} - ${endFormatted}`}</ThemedText>
                    <ThemedText>{item.duration}</ThemedText>
                </ThemedText>
            </ThemedView>
        </ThemedView>
        </Link>
    )
}