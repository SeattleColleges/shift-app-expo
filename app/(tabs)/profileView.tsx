import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { supabase } from '../../lib/supabaseClient';
import { ScrollView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ProfileImage } from '@/components/ProfileImage';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

interface Profile {
  profile_id: string | null;
  profile_int_id: number | null;
  name: string | null;
  email: string | null;
  role: 'employee' | 'supervisor' | 'admin' | null;
  position: number | null;
  supervisor: string | null;
}

const ProfileView = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Using the profile_int_id provided
  const profileIntId = 5;

  const fetchProfileById = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('profile_int_id', profileIntId)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setError(error.message);
        } else if (data) {
          setProfile(data as Profile);
        }
      } else {
        setError('Supabase client is not initialized.');
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array

  useEffect(() => {
    fetchProfileById();
  }, [fetchProfileById]);

  const handleLogout = () => {
    router.replace('/(auth)'); // Navigate to the login page
    console.log('Logout pressed');
  };

  const handleEditProfile = () => {
    if (profile) {
      router.push({
        pathname: '/(tabs)/editProfile',
        params: {
          profile_id: profile.profile_id || '',
          profile_int_id: profile.profile_int_id ? profile.profile_int_id.toString() : '',
          name: profile.name || '',
          email: profile.email || '',
          role: profile.role || '',

        },
      });
    }
  };

  const links: { label: string; icon: 'alert-circle' | 'grid' | 'repeat' | 'send' | 'download' | 'calendar' | 'clock' | 'user'; action: () => void }[] =
    profile?.role === 'admin'
      ? [
          { label: 'Review Time Off Requests', icon: 'alert-circle', action: () => console.log('Review Time Off Requests') },
          { label: 'View Shift Coverage Gaps', icon: 'grid', action: () => console.log('View Shift Coverage Gaps') },
          { label: 'Review Shift Swap Requests', icon: 'repeat', action: () => console.log('Review Shift Swap Requests') },
          { label: 'Send Announcement', icon: 'send', action: () => console.log('Send Announcement') },
          { label: 'Export Weekly Requests', icon: 'download', action: () => console.log('Export Weekly Requests') },
        ]
      : [
          { label: 'Request Time Off', icon: 'calendar', action: () => console.log('Request Time Off') },
          { label: 'Request Shift Swap', icon: 'repeat', action: () => console.log('Request Shift Swap') },
          { label: 'View Shift History', icon: 'clock', action: () => console.log('View Shift History') },
          { label: 'View Supervisor Info', icon: 'user', action: () => console.log('View Supervisor Info') },
        ];

  if (loading) {
    return <Text>Loading profile...</Text>;
  }

  if (error) {
    return <Text>Error loading profile: {error}</Text>;
  }

  if (profile) {
    return (
      <>
        <ScrollView contentContainerStyle={{ justifyContent: 'space-between' }}>
          <View style={styles.topProfileContainer}>
            <View style={styles.profileImageContainer}>
              <ProfileImage
                initialImageSource={require('../../assets/images/profileImg.jpg')}
                width={80}
                height={80}
                borderRadius={40}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name || 'N/A'}</Text>
              <Text style={styles.profileEmail}>{profile.email || 'N/A'}</Text>
              <Text style={styles.profileRole}>({profile.role || 'N/A'})</Text>
              <Pressable onPress={handleEditProfile} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.border}>
            <View style={styles.schedule}>
              {links.map((link, index) => (
                <Pressable key={link.label} style={styles.linkContainer} onPress={link.action}>
                  <Feather name={link.icon} size={24} color="blue" />
                  <Text style={styles.linkText}>{link.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.buttonCont}>
            <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonTxt}>Log out</Text>
            </Pressable>
          </View>
        </ScrollView>
      </>
    );
  }

  return <Text>No profile information found.</Text>;
};

const styles = StyleSheet.create({
  topProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background
    borderRadius: 8,
    margin: 15,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  profileRole: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  border: {
    borderColor: '#ddd', // Lighter border
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    marginTop: 20, // Adjusted margin
  },
  schedule: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonCont: {
    marginTop: 30, // Adjusted margin
    paddingBottom: 20, // Added padding at the bottom
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 40,
    backgroundColor: '#007bff', // Professional blue
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileView;