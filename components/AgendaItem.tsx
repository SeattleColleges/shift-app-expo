import isEmpty from 'lodash/isEmpty';
import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import {useRouter} from "expo-router";


interface ItemProps {
    item: any;
}

const AgendaItem = (props: ItemProps) => {
    const {item} = props;
    //console.log("Item: ", item);
    const router = useRouter();
    const buttonPressed = useCallback((item) => {
        router.push({
            pathname: `/calendar/shift-details-page/[id]`,
            params: {
                id: item.id,
                // Add other params if needed
                data: JSON.stringify(item),
                //itemData: JSON.stringify(item.data),
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

    const startTimeFormat = new Intl.DateTimeFormat(
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
                <Text style={styles.itemDurationText}>{Number.parseFloat(String(item.duration / 45)).toFixed(1)} H</Text>
            </View>
            <View style={{backgroundColor:'skyblue', marginLeft:16}}>
                <Text style={styles.itemTitleText}>{item.shift_name}</Text>
                <Text>Start: {startTimeFormat.format(item.startDateObj)}</Text>
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