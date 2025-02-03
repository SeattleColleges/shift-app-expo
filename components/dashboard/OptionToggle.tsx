import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

interface OptionToggleProps {
    options?: string[],
    gap?: number
    handleToggledOption?: (value: string) => void
}
export function OptionToggle({options = ['Option1', 'Option2'], gap = 0, handleToggledOption}: OptionToggleProps) {
    const [activeButton, setActiveButton] = useState(options[0] || "");
    const handleOptionSelected = (button: string) => {
        setActiveButton(button);
        if (handleToggledOption) {
            handleToggledOption(button)
        }
    }
    return <View style={[styles.buttonRow, {gap}]}>
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
            );
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