import {ScrollView, StyleSheet, View, Text, Pressable, useColorScheme, Platform} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useState} from "react";
import {DropdownWithLabel, TextFieldWithLabel} from "@/components/CustomInputFields";
import {Colors} from "@/constants/Colors";

type SearchParams = {
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    pronouns: string,
    role: string
}

const device = Platform.OS;
export default function EditProfile () {
    const {firstName, lastName, email, pronouns, role, middleName} = useLocalSearchParams<SearchParams>();
    const [firstNameText, setFirstNameText] = useState(firstName);
    const [middleNameText, setMiddleNameText] = useState(middleName);
    const [lastNameText, setLastNameText] = useState(lastName);
    const [emailText, setEmailText] = useState(email);
    const [pronounsText, setPronounsText] = useState(pronouns);
    const [studentStatus, setStudentStatus] = useState('Full-Time');
    const router = useRouter();
    const colorScheme = useColorScheme();
    const studentStatuses = ['Full-Time', 'Part-Time', 'Intern', 'Work-Study', "Leave Of Absence"]
    return (
        <ScrollView style={{backgroundColor: Colors[colorScheme || 'light'].background}}>
            <View style={styles.headerContainer}>
                <ThemedText type={'title'}>Edit Profile</ThemedText>
                <ThemedView
                    darkColor={Colors.light.background}
                    lightColor={Colors.dark.background}
                    style={styles.circle} >
                    <ThemedText
                        style={styles.userText}
                        lightColor={Colors.light.background}
                        darkColor={Colors.dark.background}
                    >
                        {`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
                    </ThemedText>
                </ThemedView>
                <ThemedText style={{fontSize:24}} type={'default'}>
                    {`Role: ${role}`}
                </ThemedText>
            </View>
            <View style={styles.editFieldsContainer}>
                <TextFieldWithLabel
                    label={'First Name'}
                    onChangeText={setFirstNameText}
                    value={firstNameText}
                />
                <TextFieldWithLabel
                    label={'Middle Name'}
                    onChangeText={setMiddleNameText}
                    value={middleNameText}
                />
                <TextFieldWithLabel
                    label={'Last Name'}
                    onChangeText={setLastNameText}
                    value={lastNameText}
                />
                <TextFieldWithLabel
                    label={'Email'}
                    onChangeText={setEmailText}
                    value={emailText}
                />
                <TextFieldWithLabel
                    label={'Pronouns'}
                    onChangeText={setPronounsText}
                    value={pronounsText}
                />
                <DropdownWithLabel
                    label={'Student Status'}
                    values={studentStatuses}
                    selectedValue={studentStatus}
                    onValueChange={setStudentStatus}
                />
                <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => console.log('submit')} style={[styles.button, {backgroundColor: Colors[colorScheme || 'light'].text,}]}>
                        <Text style={{color: colorScheme == 'light' ? Colors.dark.text: Colors.light.text}}>
                            Submit
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => router.navigate('/(tabs)/profileView')} style={[styles.button, {backgroundColor: Colors.cancel,}]}>
                        <Text style={{color: colorScheme == 'light' ? Colors.dark.text: Colors.light.text}}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}
const circleSize = 125;
const styles = StyleSheet.create({
    headerContainer: {
        flex:1,
        alignItems:'center',
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
    },
    editFieldsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 10
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: device == 'web' ? 36 : 'auto'
    },
    buttonsContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        gap: 5,
    }
})