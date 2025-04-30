import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Pressable,
    useColorScheme,
    Platform,
    TextInput,
  } from 'react-native';
  import { ThemedText } from '@/components/ThemedText'; // Assuming this exists
  import { ThemedView } from '@/components/ThemedView'; // Assuming this exists
  import { useRouter, useLocalSearchParams } from 'expo-router';
  import { useState, useEffect } from 'react';
  import { Colors } from '@/constants/Colors'; // Assuming this exists
  import { ProfileImage } from '@/components/ProfileImage'; // Ensure this path is correct
  import { supabase } from '../../lib/supabaseClient'; // Adjust the import path if needed
  
  interface Profile {
    profile_id: string | null; // UUID from auth.users
    profile_int_id: number | null;
    name: string | null;
    email: string | null;
    role: 'employee' | 'supervisor' | 'admin' | null;
    position: number | null;
    supervisor: string | null; // UUID of the supervisor
    pronouns?: string | null; // Add pronouns, making it optional with '?' or allowing null
  }
  
  type SearchParams = Profile; // Align SearchParams with Profile
  
  const device = Platform.OS;
  export default function EditProfile() {
    const { profile_id, profile_int_id, name: initialName, email: initialEmail, role: initialRole } = useLocalSearchParams<SearchParams & { [key: string]: string }>();
    const [profile, setProfile] = useState<Profile>({
      profile_id: profile_id || null,
      profile_int_id: profile_int_id || null,
      name: initialName || null,
      email: initialEmail || null,
      role: initialRole || null,
      position: null, // Not editable in this UI
      supervisor: null, // Not editable in this UI
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const colorScheme = useColorScheme();
  
    const profileIntId = 5; // Hardcoded for fetching, replace with dynamic ID later
  
    useEffect(() => {
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
  
      fetchProfileById();
    }, []);
  
    const handleCancelPressed = () => {
      router.push('/(tabs)/profileView');
    };
  
    const handleInputChange = (name: keyof Profile, text: string) => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: text,
      }));
    };
  
    const handleSubmitPressed = () => {
      console.log('Submit pressed with data:', profile);
      // In a real application, you would send this data to your backend to update the profile
    };
  
    if (loading) {
      return <Text>Loading profile...</Text>;
    }
  
    if (error) {
      return <Text>Error loading profile: {error}</Text>;
    }
  
    return (
      <ScrollView style={{ backgroundColor: Colors[colorScheme || 'light'].background }}>
        <View style={styles.headerContainer}>
          <ThemedText type={'title'}>Edit Profile</ThemedText>
          <ProfileImage
            initialImageSource={require('../../assets/images/profileImg.jpg')} // Replace with the actual image URL if available
          />
          <ThemedText style={{ fontSize: 24 }} type={'default'}>
            {`Role: ${profile.role || 'N/A'}`}
          </ThemedText>
        </View>
        <View style={styles.editFieldsContainer}>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={profile.name?.split(' ')[0] || ''}
              onChangeText={(text) => handleInputChange('name', `${text} ${profile.name?.split(' ').slice(1).join(' ') || ''}`)}
            />
          </View>
          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={profile.name?.split(' ').slice(1).join(' ') || ''}
              onChangeText={(text) => handleInputChange('name', `${profile.name?.split(' ')[0] || ''} ${text}`)}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={profile.email || ''}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          </View>
          {/* You can add a Pronouns field here if you decide to include it in your Profile interface */}
          <View style={styles.buttonsContainer}>
            <Pressable onPress={handleSubmitPressed} style={[styles.button, { backgroundColor: Colors[colorScheme || 'light'].text }]}>
              <Text style={{ color: colorScheme === 'light' ? Colors.dark.text : Colors.light.text }}>
                Submit
              </Text>
            </Pressable>
            <Pressable onPress={handleCancelPressed} style={[styles.button, { backgroundColor: Colors.cancel }]}>
              <Text style={{ color: colorScheme === 'light' ? Colors.dark.text : Colors.light.text }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const circleSize = 125;
  const styles = StyleSheet.create({
    headerContainer: {
      flex: 1, // Fixed the issue by providing a valid value for flex
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    editFieldsContainer: {
      flex: 1,
      padding: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    button: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 8,
    },
  });