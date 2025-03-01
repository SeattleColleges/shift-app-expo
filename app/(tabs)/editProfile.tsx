import {ScrollView, StyleSheet, TextInput, View, Text, Pressable, useColorScheme} from "react-native";
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
const DropdownWithLabel = ({label, values, selectedValue, onValueChange}: DropDownWithLabelProps) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
                    { values.map(v=> <Picker.Item key={v} label={v} value={v} />) }
                </Picker>
            </View>
        </View>
    )
}
export default function EditProfile () {
    const {firstName, lastName, email, pronouns, role} = useLocalSearchParams();
    const [firstNameText, setFirstNameText] = useState(firstName as string);
    const [lastNameText, setLastNameText] = useState(lastName as string);
    const [emailText, setEmailText] = useState(email as string);
    const [pronounsText, setPronounsText] = useState(pronouns as string);
    const [studentStatus, setStudentStatus] = useState('Full-Time');
    const router = useRouter();
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
                    <Pressable onPress={() => console.log('submit')} style={[styles.button, {backgroundColor: Colors[colorScheme].text,}]}>
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
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems:'center'
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
        width:'100%'
    }
})