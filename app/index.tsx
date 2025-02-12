import React, { ReactElement, useEffect, useState } from 'react';
import { Image, StyleSheet} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';  // Import useColorScheme hook
import { supabase } from '@/supabaseClient';

export default function HomeScreen(): ReactElement {

  // const fetchMessage = async () => {
  //   const { data, error } = await supabase
  //     .from('messages')
  //     .select('text')
  //     .eq('id', 1) 
  //     .single();
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(data)
  //   }
  // };
  // fetchMessage()

  const colorScheme = useColorScheme(); // Get the current color scheme (light/dark)
    const linkStyle = [
        styles.link,
        { color: colorScheme === 'dark' ? '#ddd' : '#007bff' } // Dark mode: light color, light mode: blue
    ];
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
        <ThemedText type="subtitle">Database Message:</ThemedText>
        <HelloWave />

        <Link href="/(tabs)"
              style={linkStyle}>Go to main app features after login</Link>
        <Link
            href="/(auth)/forgot-password"
            style={linkStyle}>Forgot Password Page</Link>
        <Link
            style={linkStyle}
            href="/landing">Landing page</Link>
        <Link
            style={linkStyle}
            href="/(auth)/loginpage">Login</Link>
        <Link
            style={linkStyle}
            href="/(auth)/signuppage">Signup</Link>
        <Link 
          style={linkStyle}
          href="/(tabs)/notifications">Notifications Page</Link>

      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
  },
  message: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'left',
    marginTop: 20, // Adjust as needed
  },
});