import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {supabase} from "@/lib/supabaseClient";
import {router} from "expo-router";

const { width } = Dimensions.get('window'); // Get the current screen width

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const handleSignUp = ():void => {
    async function signUpWithEmail():Promise<void> {
      // @ts-ignore
      const { error, data:{user,session} } = await supabase?.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
          },
        },
      })

      if (error) {
        Alert.alert(error.message)
        if(error.message === 'User already registered') {
          router.replace('/(auth)')
        }
      } else { // @ts-ignore
        if (data) {
                // @ts-ignore
          Alert.alert(JSON.stringify(data, null, 2))
          console.log("Sign up page: "+JSON.stringify(data, null, 2))
                router.push('/(tabs)')
              }
      }
    }
    signUpWithEmail().then(r => {
        console.log('Sign up promise: '+r)
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="value"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="value"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="value"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Confirm Password Input */}
      {/*<View style={styles.inputContainer}>*/}
      {/*  <Text style={styles.label}>Confirm Password</Text>*/}
      {/*  <TextInput*/}
      {/*    style={styles.input}*/}
      {/*    placeholder="value"*/}
      {/*    placeholderTextColor="#888"*/}
      {/*    value={confirmPassword}*/}
      {/*    onChangeText={setConfirmPassword}*/}
      {/*    secureTextEntry*/}
      {/*  />*/}
      {/*</View>*/}

      {/*/!* Department Input *!/*/}
      {/*<View style={styles.inputContainer}>*/}
      {/*  <Text style={styles.label}>Department</Text>*/}
      {/*  <TextInput*/}
      {/*    style={styles.input}*/}
      {/*    placeholder="value"*/}
      {/*    placeholderTextColor="#888"*/}
      {/*    value={department}*/}
      {/*    onChangeText={setDepartment}*/}
      {/*  />*/}
      {/*</View>*/}

      {/*/!* Supervisor Input *!/*/}
      {/*<View style={styles.inputContainer}>*/}
      {/*  <Text style={styles.label}>Supervisor</Text>*/}
      {/*  <TextInput*/}
      {/*    style={styles.input}*/}
      {/*    placeholder="value"*/}
      {/*    placeholderTextColor="#888"*/}
      {/*    value={supervisor}*/}
      {/*    onChangeText={setSupervisor}*/}
      {/*  />*/}
      {/*</View>*/}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={()=> router.replace('/(auth)')}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: width > 400 ? 32 : 28,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  inputContainer: {
    width: '85%',
    maxWidth: 400,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: width > 400 ? 50 : 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  signUpButton: {
    width: '85%',
    maxWidth: 400,
    height: width > 400 ? 50 : 45,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#007BFF',
    fontSize: 14,
    marginLeft: 5,
  },
});
