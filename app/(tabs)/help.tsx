import React, { useEffect, useState } from 'react';
import {StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HelpPage() {

  return (
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Help page placeholder</ThemedText>
        <Text style={styles.message}></Text>
      </ThemedView>
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
