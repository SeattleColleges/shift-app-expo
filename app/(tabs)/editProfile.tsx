import {ScrollView, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";

export default function EditProfile () {
    
    return (
        <ScrollView>
            <View style={styles.headerContainer}>
                <ThemedText type={'title'}>Edit Profile</ThemedText>
                <ThemedView darkColor={'#fff'} lightColor={'#000'} style={styles.circle} >
                    <ThemedText style={styles.userText} lightColor={'#fff'} darkColor={'#000'} >Tdfsfd</ThemedText>
                </ThemedView>
                <ThemedText style={{fontSize:24}} type={'default'}>
                    Role: Ad Tutor
                </ThemedText>
            </View>
        </ScrollView>
    )
}
const circleSize = 125;
const styles = StyleSheet.create({
    headerContainer: {
        flex:1,
        alignItems:'center',
        backgroundColor: 'yellow',
        gap:15,
        paddingVertical: 16
    },
    circle: {
        borderRadius: circleSize / 2,
        height: circleSize,
        width: circleSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userText: {
        fontSize: 20
    }
})