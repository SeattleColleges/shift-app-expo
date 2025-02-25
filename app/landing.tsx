import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LandingPage() {
  const router = useRouter();

  const handleMenuPress = () => {
    console.log('Menu pressed!'); // Add navigation logic here
  };

  const handleLoginPress = () => {
    router.push('/loginpage'); // Navigate to the login page
  };

  return (
    <ThemedView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleMenuPress}>
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Shift Scheduling App
        </ThemedText>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices sollicitudin
          fermentum. Quisque pellentesque felis quis augue imperdiet, quis egestas turpis accumsan.
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  navbar: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  hamburger: {
    width: 30,
    height: 20,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  titleContainer: {
    marginTop: 100,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 40, // Adjusted to make the button narrower
    borderRadius: 5,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  aboutContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: '#555',
  },
});