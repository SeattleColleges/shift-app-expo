import React, {useEffect} from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { supabase } from '@/supabaseClient';
import {OptionToggle} from "@/components/dashboard/OptionToggle";

export default function UserDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<string | undefined>();
  const [selectedApprovalStatus, setSelectedApprovalStatus] = React.useState<string | undefined>();

  useEffect(() => {
    console.log(selectedApprovalStatus);
  }, [selectedApprovalStatus]);
  useEffect(() => {
    console.log(selectedTimeframe);
  }, [selectedTimeframe]);
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
        <OptionToggle
            options={['Week', 'Month']}
            gap={8}
            handleToggledOption={setSelectedTimeframe}
        />
        <OptionToggle
            options={['Pending', 'Approved', 'Denied']}
            gap={4}
            handleToggledOption={setSelectedApprovalStatus}
        />
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
