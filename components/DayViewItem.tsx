import {Text, View} from "react-native";
import React from "react";

interface DayViewItemProps {
    item: any,
}

export const DayViewItem = ({item}: DayViewItemProps) => {
    const start = Number(item.startTime.split(':')[0]);
    const end = Number(item.endTime.split(':')[0]);
    const numHoursScheduled = end - start;
    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={{
                marginBottom: 10,
                width: '70%',
                margin: 15,
                backgroundColor: '#CFD8DC',
                padding: 10,
                paddingLeft: 20,
                borderRadius: 20
            }}>
                <Text style={{fontSize: 16}}>{item.role}</Text>
                <Text style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 12, color: '#3e3e3e'}}>
                    <Text>{item.building}: </Text>
                    <Text>{item.roomNumber}</Text>
                </Text>
                <Text style={{flexDirection: 'row', justifyContent: 'flex-start', fontSize: 16, marginVertical: 4}}>
                    <Text>{numHoursScheduled} HR | </Text>
                    <Text>{`${item.startTime} ${start >= 12 ? "PM" : "AM"} - ${item.endTime} ${end >= 12 ? "PM" : "AM"}`}</Text>
                    <Text>{item.duration}</Text>
                </Text>
            </View>
        </View>
    )
}