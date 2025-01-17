import React from 'react';
import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CoworkersList from "@/components/CoworkersList";

export default function CoWorkersPage() {
  return (
      <ThemedView style={[styles.stepContainer, styles.container]}>
        <ThemedText type="title">Coworkers</ThemedText>
        <CoworkersList />
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});