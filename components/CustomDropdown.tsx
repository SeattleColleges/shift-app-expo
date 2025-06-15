import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the dropdown arrow

const { width } = Dimensions.get('window');

interface DropdownOption {
    label: string;
    value: string;
}

interface CustomDropdownProps {
    label: string;
    options: DropdownOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    options,
    selectedValue,
    onValueChange,
    placeholder = "Select an option"
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOptionLabel = options.find(option => option.value === selectedValue)?.label || placeholder;

    const handleSelect = (value: string) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.dropdownButtonText}>
                    {selectedValue ? selectedOptionLabel : placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)} // Close modal when tapping outside
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "85%",
        maxWidth: 400,
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        color: "#333",
        marginBottom: 5,
    },
    dropdownButton: {
        width: "100%",
        height: width > 400 ? 50 : 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f9f9f9",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownButtonText: {
        fontSize: 16,
        color: "#333",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        maxHeight: Dimensions.get('window').height * 0.5, // Limit height
        width: '80%', // Make it wide
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    optionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        marginLeft: 15,
        marginRight: 15,
    }
});

export default CustomDropdown;