import React from "react";
import type { ReactElement } from "react";
import { Image, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";

export default function HomeScreen(): ReactElement {
  const colorScheme = useColorScheme();
  const linkStyle = [
    styles.link,
    { color: colorScheme === "dark" ? "#ddd" : "#007bff" },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Database Message:</ThemedText>
        <HelloWave />

        <Link href="/(tabs)/calendar" style={linkStyle}>
          Go to main app features after login
        </Link>
        <Link href="/(auth)/forgot-password" style={linkStyle}>
          Forgot Password Page
        </Link>
        <Link href="/help" style={linkStyle}>
          Help Page
        </Link>
        <Link href="/landing" style={linkStyle}>
          Landing page
        </Link>
        <Link href="/(auth)" style={linkStyle}>
          Login
        </Link>
        <Link href="/(auth)/signuppage" style={linkStyle}>
          Signup
        </Link>
        <Link href="/(tabs)/notifications" style={linkStyle}>
          Notifications Page
        </Link>
        <Link href="/add-schedule" style={linkStyle}>
          Add Schedule
        </Link>
        <Link href="/request-time-off" style={linkStyle}>
          Go to Request Time Off Page
        </Link>
        <Link href={"/db-function-calls"} style={linkStyle}>
          DB Function Calls
        </Link>
        <Link href={"/calendar"} style={linkStyle}>
          Calendar Page
        </Link>
        <Link href={"/employee-time-page"} style={linkStyle}>
          Employee Time Page
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  message: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "left",
    marginTop: 20,
  },
});