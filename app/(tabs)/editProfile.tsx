import {ScrollView, StyleSheet, TextInput, View, Text, Pressable, useColorScheme, Platform} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import {Picker} from "@react-native-picker/picker";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useState} from "react";

interface TextFieldWithLabelProps {
    label: string,
    onChangeText: (text: string) => void
    value: string
}
interface DropDownWithLabelProps {
    label: string,
    values: string[],
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
}
type SearchParams = {
    firstName: string,
    lastName: string,
    email: string,
    pronouns: string,
    role: string
}
const TextFieldWithLabel = ({label, onChangeText, value, ...props}: TextFieldWithLabelProps) => {
    return (
        <View>
            <ThemedText
                darkColor={'#ccc'}
                lightColor={'#333'}
                style={styles.label}>
                {label}
            </ThemedText>
            <TextInput
                {...props}
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}
const DropdownWithLabel = ({label, values, selectedValue, onValueChange}: DropDownWithLabelProps) => {
    return (
        <View>
            <ThemedText
                darkColor={'#ccc'}
                lightColor={'#333'}
                style={styles.label}>
                {label}
            </ThemedText>
            <ThemedView style={[styles.picker]}>
                <Picker
                    style={{color:Colors.light.text, backgroundColor:Colors.light.background}}
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                >
                    { values.map(v=> <Picker.Item key={v} label={v} value={v} />) }
                </Picker>
            </ThemedView>
        </View>
    )
}
const device = Platform.OS;
export default function EditProfile () {
    const {firstName, lastName, email, pronouns, role} = useLocalSearchParams<SearchParams>();
    const [firstNameText, setFirstNameText] = useState(firstName);
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
                <ThemedView darkColor={'#fff'} lightColor={'#000'} style={styles.circle} >
                    <ThemedText style={styles.userText} lightColor={'#fff'} darkColor={'#000'} >
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
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor:'#fff'
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: device == 'web' ? 36 : 'auto'
    },
    picker: {
        borderColor:'#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
    buttonsContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        gap: 5,
    }
})