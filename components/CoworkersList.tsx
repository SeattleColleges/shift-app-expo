import {FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import {coworkersDummyData} from "@/data/dummyCoworkerData";
import {CoworkerListItem} from "@/components/CoworkerListItem";
import React from "react";
import {Coworker} from "@/types/Coworker";
import {mockCurrentUser as currUser} from "@/context/MockCurrentUser";

export default function CoworkersList() {
    const filteredList = coworkersDummyData.filter(c => {
        return (c.position_id == currUser.positionId) && (c.department_id == currUser.departmentId)
    });
    const renderCoworker: ListRenderItem<Coworker> = ({ item }) =>
        <CoworkerListItem
            id={item.id}
            name={item.name}
            role={item.role}
            profileImageUrl={item.profileImageUrl}
            position_id={item.position_id}
            department_id={item.department_id}
        />;
    interface ItemSeparatorProps {
        height?: number;  // Optional prop to control the spacing height
    }

    const ItemSeparator: React.FC<ItemSeparatorProps> = ({ height = 10 }) => {
        return <View style={{ height }} />;
    };
    return (
        <View style={styles.coworkersList} >
            <FlatList
                data={filteredList}
                renderItem={renderCoworker}
                ItemSeparatorComponent={() => <ItemSeparator height={30}/>}
                contentContainerStyle={{paddingBottom: 80}}
                maxToRenderPerBatch={3}
                windowSize={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    coworkersList: {
        flex: 1,
        width: '100%',
    }
});