import React from 'react';
import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import ShiftDetailsComp from '@/components/ShiftDetailsComp';

export default function ShiftDetailsPage() {

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
        <ShiftDetailsComp/>
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
