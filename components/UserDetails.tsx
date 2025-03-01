import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export const UserDetails = () => {
  const firstName = "first name";
  const lastName = "last name";
  const dateHired = "2222-22-22";
  const dept = "department";
  const supervisor = "supervisor";
  const email = "email";
  const phoneNumber = "(206) 999-9999";
  const pronouns ='they/them'
  return (
    <>
        <View style={styles.container}>
            <View>
                <Link
                    style={{alignSelf:'flex-end'}}
                    href={{
                        pathname:"/editProfile",
                        params: {
                            firstName,
                            lastName,
                            email,
                            pronouns
                        }
                    }}
                >
                    <Ionicons name={'pencil-outline'} size={20} />
                </Link>
                <View>
                    <Text style={styles.heading}>User Details</Text>
                    <Text style={styles.text}>First Name: {firstName}</Text>
                    <Text style={styles.text}>Last Name: {lastName}</Text>
                    <Text style={styles.text}>Date Hired: {dateHired}</Text>
                    <Text style={styles.text}>Department: {dept}</Text>
                    <Text style={styles.text}>Supervisor: {supervisor}</Text>
                    <Text style={styles.text}>Email: {email}</Text>
                    <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
                </View>
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        backgroundColor: "#eee",
        padding: 10
    },
    heading: {
        textAlign: "center",
        paddingBottom: 20,
    },
    text: {
        paddingBottom: 10,
    },

})
