import {TextInput, View, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import {ThemedView} from "@/components/ThemedView";
import {Picker} from "@react-native-picker/picker";

interface TextFieldWithLabelProps {
    label: string,
    onChangeText: (text: string) => void
    value: string
}
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

export const TextFieldWithLabel = ({label, onChangeText, value, ...props}: TextFieldWithLabelProps) => {
    return (
        <View>
            <ThemedText
                darkColor={Colors.dark.text}
                lightColor={Colors.light.text}
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
export const DropdownWithLabel = ({label, values, selectedValue, onValueChange}: DropDownWithLabelProps) => {
    return (
        <View>
            <ThemedText
                darkColor={Colors.dark.text}
                lightColor={Colors.light.text}
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
const styles = StyleSheet.create({
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
    picker: {
        borderColor:'#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
})