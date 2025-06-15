import isEmpty from 'lodash/isEmpty';
import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import {useRouter} from "expo-router";
import { durationFormat } from '@/data/utils';


interface ItemProps {
    item: any;
}

const AgendaItem = (props: ItemProps) => {
    const {item} = props;
    //console.log("Item: ", item);
    const router = useRouter();
    const buttonPressed = useCallback((item) => {
        router.push({
            pathname: '/calendar/shift-details-page/[id]',
            params: {
                id: item.id,
                data: JSON.stringify(item),
                role: item.role
            }
        });
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, [item]);

    if (isEmpty(item)) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No Events Planned Today</Text>
            </View>
        );
    }

    const hourMinuteFormat = new Intl.DateTimeFormat(
        'en-US',
        {
            hour:   'numeric',
            minute: '2-digit',
            hour12: true
        }
    )

    // @ts-ignore
    return (
        <TouchableOpacity style={styles.item}>
            <View>
                <Text style={styles.itemHourText}>{"Duration"}</Text>
                <Text style={styles.itemDurationText}>{durationFormat(item.duration)} H</Text>
            </View>
            <View style={{//backgroundColor:'skyblue',
                marginLeft:16}}>
                <Text style={styles.itemTitleText}>{item.shift_name}</Text>
                <Text>Start: {hourMinuteFormat.format(item.startDateObj) + ' - ' + hourMinuteFormat.format(item.endDateObj)}</Text>
                <Text>{ 'Status: ' + item.shift_change_data?.status}</Text>
            </View>

            <View style={styles.itemButtonContainer}>
                <Button color={'grey'} title={'Info'} onPress={() => buttonPressed(item)}/>
            </View>

        </TouchableOpacity>
    );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row'
    },
    itemHourText: {
        color: 'black'
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
    itemTitleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14
    }
});