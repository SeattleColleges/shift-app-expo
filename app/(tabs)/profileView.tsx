import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { UserDetails } from "@/components/UserDetails";
import { ProfileImage } from "@/components/ProfileImage"; // Import ProfileImage component
import { User } from "@/types/User";
import * as Linking from "expo-linking"; // Import Linking from expo

const defaultUser: User = {
  firstName: "firstname",
  middleName: "middlename",
  lastName: "lastname",
  dateHired: "12/31/1999",
  dept: "dept",
  email: "email@example.com",
  phone: "555-555-5555",
  pronouns: "they/them",
  role: "user", // Change this to "admin" or "user" to test
  supervisor: "supervisor",
  userName: "user_name",
};

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(defaultUser);

  const handleLogout = () => {
    Linking.openURL("/"); // Navigate to the root of your app (index.tsx)
  };

  const links: { label: string; icon: "alert-circle" | "grid" | "repeat" | "send" | "download" | "calendar" | "clock" | "user"; action: () => void }[] =
    user?.role === "admin"
      ? [
          { label: "Review Time Off Requests", icon: "alert-circle", action: () => console.log("Review Time Off Requests") },
          { label: "View Shift Coverage Gaps", icon: "grid", action: () => console.log("View Shift Coverage Gaps") },
          { label: "Review Shift Swap Requests", icon: "repeat", action: () => console.log("Review Shift Swap Requests") },
          { label: "Send Announcement", icon: "send", action: () => console.log("Send Announcement") },
          { label: "Export Weekly Requests", icon: "download", action: () => console.log("Export Weekly Requests") },
        ]
      : [
          { label: "Request Time Off", icon: "calendar", action: () => console.log("Request Time Off") },
          { label: "Request Shift Swap", icon: "repeat", action: () => console.log("Request Shift Swap") },
          { label: "View Shift History", icon: "clock", action: () => console.log("View Shift History") },
          { label: "View Supervisor Info", icon: "user", action: () => console.log("View Supervisor Info") },
        ];

  return (
    <>
      <ScrollView contentContainerStyle={{ justifyContent: "space-between" }}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <ProfileImage
              initialImageSource={require("../../assets/images/profileImg.jpg")} // Replace with the actual image URL or logic
            />
          </View>
          <UserDetails user={user || defaultUser} />
          <View>
            <Text>Hi!, {user?.userName || "User Name"}!</Text>
          </View>
        </View>
        <View style={styles.border}>
          <View style={styles.schedule}>
            {links.map((link, index) => (
              <Pressable key={index} style={styles.linkContainer} onPress={link.action}>
                <Feather name={link.icon} size={24} color="blue" />
                <Text style={styles.linkText}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.buttonCont}>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonTxt}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderColor: "#80808",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    marginTop: 40,
  },
  schedule: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonCont: {
    marginTop: 200,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: 140,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTxt: {
    color: "#fff",
    alignSelf: "center",
  },
});