import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

interface OptionToggleProps {
    options?: string[],
}
export function OptionToggle({options = ['Option1', 'Option2']}: OptionToggleProps) {
    const [activeButton, setActiveButton] = useState(options[0]);
    const handleOptionSelected = (button: string) => {
        setActiveButton(button);
    }
    return <View style={styles.buttonRow}>
        {
            options.map((option, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.button,
                        activeButton === option && styles.buttonActive,
                    ]}
                    onPress={() => handleOptionSelected(option)}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            activeButton === option && styles.buttonTextActive,
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            )
            })
        }
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