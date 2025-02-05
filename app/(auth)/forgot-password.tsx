import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Button, Text } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from 'react-native';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const colorScheme = useColorScheme(); // Use the color scheme for light and dark mode

  // Handle password reset function when button is clicked (simple stage, needs further enhancing)
  const handlePasswordReset = () => {
    if (!email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('If this email is registered, you will receive a reset link.');
    }, 2000);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Forgot Password</ThemedText>
        <Text
          style={[
            styles.message,
            { color: colorScheme === 'dark' ? 'white' : 'black' }, // Text color for the message (based on light and dark mode)
          ]}
        >
          Enter your email address below, and we’ll send you a link to reset your password.
        </Text>
        <TextInput
          style={[styles.input, { color: colorScheme === 'light' ? 'black' : 'white' }]} // Dynamic color based on colorScheme (light/dark mode) 
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colorScheme === 'light' ? 'gray' : 'lightgray'} // Change placeholder color for light/dark mode
        />
        <Button
            title={isSubmitting ? 'Sending...' : 'Send Reset Link'}
            onPress={handlePasswordReset}
            disabled={isSubmitting}
          />
        {message !== '' && <Text style={styles.feedback}>{message}</Text>}
        <Link href="/loginpage" style={styles.link}>
        Back to Login
        </Link> 
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  feedback: {
    fontSize: 14,
    color: 'green',
    marginTop: 12,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

