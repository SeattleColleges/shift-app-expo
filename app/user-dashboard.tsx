import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { supabase } from '@/lib/supabaseClient';

export default function UserDashboard() {
  const [activeButtonTopRow, setActiveButtonTopRow] = useState('Pending');
  const [activeButtonBottomRow, setActiveButtonBottomRow] = useState('Week');

  const handlePressTopRow = (button: string) => {
    setActiveButtonTopRow(button);
  };

  const handlePressBottomRow = (button: string) => {
    setActiveButtonBottomRow(button);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      {/* Schedule Title*/}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Schedule</Text>

        {/* Top Row of Buttons */}

        {/* Pending button */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              activeButtonTopRow === 'Pending' && styles.buttonActive,
            ]}
            onPress={() => handlePressTopRow('Pending')}
          >
            <Text style={[
              styles.buttonText,
              activeButtonTopRow === 'Pending' && styles.buttonTextActive,
            ]}
            >
              Pending
            </Text>
          </TouchableOpacity>

          {/* Approved button */}
          <TouchableOpacity
            style={[
              styles.button,
              activeButtonTopRow === 'Approved' && styles.buttonActive,
            ]}
            onPress={() => handlePressTopRow('Approved')}
          >
            <Text
              style={[
                styles.buttonText,
                activeButtonTopRow === 'Approved' && styles.buttonTextActive,
              ]}
            >
              Approved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Row of Buttons */}

        {/* Week button */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              activeButtonBottomRow === 'Week' && styles.buttonActive,
            ]}
            onPress={() => handlePressBottomRow('Week')}
          >
            <Text
              style={[
                styles.buttonText,
                activeButtonBottomRow === 'Week' && styles.buttonTextActive,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>

          {/* Month button */}
          <TouchableOpacity
            style={[
              styles.button,
              activeButtonBottomRow === 'Month' && styles.buttonActive,
            ]}
            onPress={() => handlePressBottomRow('Month')}
          >
            <Text
              style={[
                styles.buttonText,
                activeButtonBottomRow === 'Month' && styles.buttonTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Placeholder Box */}
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>
          Calendar Components Placeholder Box
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  scheduleContainer: {
    margin: 16,
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#CFD8DC',
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
  },
  buttonTextActive: {
    color: 'white',
    fontSize: 12,
  },
  placeholderBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: 'black',
  },
});
