import React, {FC} from "react";
import {StyleSheet, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Image} from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface CoworkerProps {
    id: string,
    name: string,
    role?: string | undefined
    profileImageUrl?: string | undefined
}
const defaultProfilePicUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const handleChatButtonPressed = (name: string) => {
    console.log(`Chat with ${name}`)
}
export const CoworkerListItem: FC<CoworkerProps> = ({ name, role, profileImageUrl }) => (
    <ThemedView style={styles.container}>
        <View style={styles.coworkerContainer}>
            <Image
                style={styles.profileImage}
                source={profileImageUrl || defaultProfilePicUrl}
            />
            <View style={styles.basicInfoContainer}>
                <ThemedText type={'subtitle'}>
                    {name}
                </ThemedText>
                <ThemedText type={'role'}>
                    {role}
                </ThemedText>
            </View>
        </View>
        <ThemedText>
            <Ionicons
                name={'chatbox-outline'}
                size={24}
                onPress={() => handleChatButtonPressed(name)}
            />
        </ThemedText>
    </ThemedView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30
    },
    basicInfoContainer: {
        marginLeft: 10
    },
    coworkerContainer: {
        flex: 1,
        flexDirection: "row",
    },
    profileImage: {
        flex: 1,
        maxWidth: 50,
        borderRadius: 50
    },
});