import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../../lib/supabaseClient'; // Adjust the import path if needed

interface Profile {
  profile_id: string; // UUID from auth.users
  profile_int_id: number;
  name: string | null;
  email: string | null;
  role: 'employee' | 'supervisor' | 'admin';
  position: number | null;
  supervisor: string | null; // UUID of the supervisor
}

const ProfileView = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Using the profile_int_id provided
  const profileIntId = 5;

  const fetchProfileById = async () => {
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
  };

  useEffect(() => {
    fetchProfileById();
  }, [profileIntId, supabase]); // Depend on profileIntId and supabase

  if (loading) {
    return <Text>Loading profile...</Text>;
  }

  if (error) {
    return <Text>Error loading profile: {error}</Text>;
  }

  if (profile) {
    return (
      <View>
        <Text>Profile Information</Text>
        <Text>Profile Int ID: {profile.profile_int_id}</Text>
        <Text>Profile ID (UUID): {profile.profile_id}</Text>
        <Text>Name: {profile.name || 'N/A'}</Text>
        <Text>Email: {profile.email || 'N/A'}</Text>
        <Text>Role: {profile.role}</Text>
        {profile.position && <Text>Position ID: {profile.position}</Text>}
        {profile.supervisor && <Text>Supervisor ID: {profile.supervisor}</Text>}
        {/* Add more profile information here */}
      </View>
    );
  }

  return <Text>No profile information found.</Text>;
};

export default ProfileView;