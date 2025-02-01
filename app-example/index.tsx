import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/supabaseClient';

export default function HomeScreen() {
  const [message, setMessage] = useState('Fetching...');

  const fetchMessage = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('text')
      .eq('id', 1) 
      .single();
    if (error) {
      console.error(error);
      setMessage('Error fetching message');
    } else {
      setMessage(data.text);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

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
        <Text style={styles.message}>{message}</Text>
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
});
