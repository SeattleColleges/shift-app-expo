import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ShiftDetailsComp from '@/components/ShiftDetailsComp';

export default function ShiftDetailPage() {
  return (
      <ThemedView style={[styles.container]}>
        <ThemedText
            style={styles.title}
            type="title"
        >
        </ThemedText>
        <ShiftDetailsComp
         />
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