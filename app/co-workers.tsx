import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CoworkersList from "@/components/CoworkersList";

export default function CoWorkersPage() {
  return (
      <ThemedView style={[styles.container]}>
        <ThemedText
            style={styles.title}
            type="title"
        >
          Coworkers
        </ThemedText>
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
  title: {
    marginVertical: 8,
  },
});