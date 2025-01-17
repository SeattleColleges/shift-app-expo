import {FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import {coworkersDummyData} from "@/data/dummyCoworkerData";
import {CoworkerListItem, CoworkerProps} from "@/components/CoworkerListItem";
import React from "react";

export default function CoworkersList() {
    const renderCoworker: ListRenderItem<CoworkerProps> = ({ item }) =>
        <CoworkerListItem
            id={item.id}
            name={item.name}
            role={item.role}
            profileImageUrl={item.profileImageUrl}

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
                data={coworkersDummyData}
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