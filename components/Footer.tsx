import Feather from "@expo/vector-icons/Feather";
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView, StyleSheet, View } from "react-native";

export default function Footer() {
  return (
    <>
    <ScrollView>
      <View style={styles.container}>
      <View><Feather name="home" size={32} color="black" /></View>
      <View> <Entypo name="new-message" size={32} color="black" /></View>
      <View><Feather name="users" size={32} color="black" /></View>
      <View><Feather name="help-circle" size={32} color="black" /></View>
      <View><Feather name="user" size={32} color="black" /></View>
      
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    
  },
});
