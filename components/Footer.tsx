import React from "react";
import Feather from "@expo/vector-icons/Feather";
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function Footer() {
  return (
    <>
    <ScrollView>
      <View style={styles.container}>
      <View><Pressable><Feather name="home" size={32} color="black" /></Pressable></View>
      <View> <Pressable><Entypo name="new-message" size={32} color="black" /></Pressable></View>
      <View><Pressable><Feather name="users" size={32} color="black" /></Pressable></View>
      <View><Pressable><Feather name="help-circle" size={32} color="black" /></Pressable></View>
      <View><Pressable><Feather name="user" size={32} color="black" /></Pressable></View>
      
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
