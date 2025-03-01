import {ScrollView, StyleSheet, TextInput, View, Text, Pressable, useColorScheme} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import {Picker} from "@react-native-picker/picker";
import {useLocalSearchParams} from "expo-router";
import {useState} from "react";

interface TextFieldWithLabelProps {
    label: string,
    onChangeText: (text: string) => void
    value: string
}
interface DropDownWithLabelProps {
    label: string,
    values: string[]
}
export default function EditProfile () {
    const {firstName, lastName, email, pronouns} = useLocalSearchParams();
    const [firstNameText, setFirstNameText] = useState(firstName);
    const [lastNameText, setLastNameText] = useState(lastName);
    const [emailText, setEmailText] = useState(email);
    const [pronounsText, setPronounsText] = useState(pronouns);
    const TextFieldWithLabel = ({label, onChangeText, value, ...props}: TextFieldWithLabelProps) => {
        return (
            <View>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    {...props}
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
        )
    }
    const DropdownWithLabel = ({label, values}: DropDownWithLabelProps) => {
        return (
            <View>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.picker}>
                    <Picker>
                        { values.map(v=> <Picker.Item key={v} label={v} value={v} />) }
                    </Picker>
                </View>
            </View>
        )
    }
    const colorScheme = useColorScheme() || 'light';
    const studentStatuses = ['Full-Time', 'Part-Time']
    return (
        <ScrollView>
            <View style={styles.headerContainer}>
                <ThemedText type={'title'}>Edit Profile</ThemedText>
                <ThemedView darkColor={'#fff'} lightColor={'#000'} style={styles.circle} >
                    <ThemedText style={styles.userText} lightColor={'#fff'} darkColor={'#000'} >
                        {`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
                    </ThemedText>
                </ThemedView>
                <ThemedText style={{fontSize:24}} type={'default'}>
                    Role: Ad Tutor
                </ThemedText>
            </View>
            <View style={styles.editFieldsContainer}>
                <TextFieldWithLabel
                    label={'First Name'}
                    onChangeText={setFirstNameText}
                    value={firstNameText as string}
                />
                <TextFieldWithLabel
                    label={'Last Name'}
                    onChangeText={setLastNameText}
                    value={lastNameText as string}
                />
                <TextFieldWithLabel
                    label={'Email'}
                    onChangeText={setEmailText}
                    value={emailText as string}
                />
                <TextFieldWithLabel
                    label={'Pronouns'}
                    onChangeText={setPronounsText}
                    value={pronounsText as string}
                />
                <DropdownWithLabel label={'Student Status'} values={studentStatuses} />
                <Pressable onPress={() => console.log('submit')} style={[styles.button, {backgroundColor: Colors[colorScheme].text,}]}>
                    <Text style={{color: colorScheme == 'light' ? Colors.dark.text: Colors.light.text}}>
                        Submit
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}
const circleSize = 125;
const styles = StyleSheet.create({
    headerContainer: {
        flex:1,
        alignItems:'center',
        // backgroundColor: 'yellow',
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
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        padding: 12,
        borderRadius: 5,
        alignItems:'center'
    },
    picker: {
        borderColor:'#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
})