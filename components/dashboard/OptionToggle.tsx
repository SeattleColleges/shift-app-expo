import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

interface OptionToggleProps {
    option1: string,
    option2: string,
}
export function OptionToggle({option1, option2}: OptionToggleProps) {
    const [activeButton, setActiveButton] = useState(option1);

    const handleOptionSelected = (button: string) => {
        setActiveButton(button);
    }
    return  <View style={styles.buttonRow}>
        {/* Option 1 */}
        <TouchableOpacity
            style={[
                styles.button,
                activeButton === option1 && styles.buttonActive,
            ]}
            onPress={() => handleOptionSelected(option1)}
        >
            <Text
                style={[
                    styles.buttonText,
                    activeButton === option1 && styles.buttonTextActive,
                ]}
            >
                {option1}
            </Text>
        </TouchableOpacity>
        {/* Option 2 */}
        <TouchableOpacity
            style={[
                styles.button,
                activeButton === option2 && styles.buttonActive,
            ]}
            onPress={() => handleOptionSelected(option2)}
        >
            <Text
                style={[
                    styles.buttonText,
                    activeButton === option2 && styles.buttonTextActive,
                ]}
            >
                {option2}
            </Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#CFD8DC',
        paddingVertical: 12,
        marginHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'black',
        fontSize: 12,
    },
    buttonTextActive: {
        color: 'white',
        fontSize: 12,
    },
});