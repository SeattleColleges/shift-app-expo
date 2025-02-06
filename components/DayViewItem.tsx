import {Text, View} from "react-native";
import React from "react";
import {ShiftData} from "@/data/dummyShiftData";

interface DayViewItemProps {
    id: number;
    shift: ShiftData;
}

interface Props{
    item: any,
}

export const DayViewItem = (props: Props) => {
    const {item} = props;
    const numHoursScheduled = Number(item.endTime.split(':')[0]) - Number(item.startTime.split(':')[0]);
    return (
        <View style={{backgroundColor:'white'}}>
            <View style={{marginBottom: 10, width: '70%', margin: 15, backgroundColor: '#CFD8DC', padding: 10, paddingLeft: 20, borderRadius: 20}}>
                <Text>{item.role}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 5}}>
                    <Text>{item.building}:</Text>
                    <Text>{item.roomNumber}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text>{numHoursScheduled} HR | </Text>
                    <Text>{item.startTime} - {item.endTime}</Text>
                    <Text>{item.duration}</Text>
                </View>
            </View>
        </View>
    )
}