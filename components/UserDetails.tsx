import React from 'react'
import { Text, View, StyleSheet } from "react-native";

export const UserDetails = () => {
  const firstName = "first name";
  const lastName = "last name";
  const dateHired = "2222-22-22";
  const dept = "department";
  const supervisor = "supervisor";
  const email = "email";
  const phoneNumber = "(206) 999-9999";
  return (
    <>
        <View style={styles.container}>
            <View>
                <View>
                    <Text>User Deets</Text>
                    <Text>First Name: {firstName}</Text>
                    <Text>Last Name: {lastName}</Text>
                    <Text>Date Hired: {dateHired}</Text>
                    <Text>Department: {dept}</Text>
                    <Text>Supervisor: {supervisor}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Phone Number: {phoneNumber}</Text>
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
    },

})
