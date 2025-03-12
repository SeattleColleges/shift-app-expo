import React, {useState} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";
import { UserDetails } from "@/components/UserDetails";
import {User} from "@/types/User";
const defaultUser: User = {
  firstName: "firstname",
  middleName: "middlename",
  lastName: "lastname",
  dateHired: "12/31/1999",
  dept: "dept",
  email: "email@example.com",
  phone: "555-555-5555",
  pronouns: "they/them",
  role: "role",
  supervisor: "supervisor",
  userName: 'user_name'
}
export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(defaultUser);
  return (
      <>
        <ScrollView contentContainerStyle={{justifyContent: 'space-between'}}>
          <View style={styles.container}>
            <View style={styles.profile}>
              <Image
                  style={styles.image}
                  source="../assets/images/profileImg.jpg"
              />
            </View>
            <UserDetails user={user || defaultUser}/>
            <View>
              <Text>
                Hi!, {user?.userName || "User Name"}!
              </Text>
            </View>
          </View>
          <View style={styles.border}>
            <View style={styles.schedule}>
              <View style={styles.grid}>
                <View style={{paddingRight: 10}}>
                  <Feather name="plus-circle" size={24} color="green"/>
                  <Feather name="alert-circle" size={24} color="red"/>
                </View>
                <View style={styles.txt}>
                  <View style={{marginLeft: 10}}>
                    <Text>Create Schedule</Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text>Review time off requests</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonCont}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonTxt}>Log out</Text>
            </Pressable>
          </View>
        </ScrollView>
        <View>
        </View>
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
  image: {
    width: "100%",
    height: "100%",
  },
  border: {
    borderColor: "#80808",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 140,
    marginTop: 40,
  },
  schedule: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
  },
  txt: {
    justifyContent: "space-around"
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
    alignItems: "center"
  },
  buttonTxt: {
    color: "#fff",
    alignSelf: "center",
  },
});
