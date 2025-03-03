import { Alert, Platform } from "react-native";

const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
        alert(`${title}\n\n${message}`);
    } else {
        Alert.alert(title, message);
    }
};

export default showAlert;