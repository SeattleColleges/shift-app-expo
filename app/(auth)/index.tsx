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
import {useRouter} from "expo-router";
import {supabase} from "@/lib/supabaseClient";

const { width } = Dimensions.get('window'); // Get the current screen width

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSignIn = ():void => {
    async function signInWithEmail() {
      // @ts-ignore For now
      const { error, data } = await supabase?.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        Alert.alert(error.message)
      }
      if (data) {
        Alert.alert(JSON.stringify(data, null, 2))
        console.log("Sign in page: "+JSON.stringify(data, null, 2))
        router.replace('/(tabs)')
      }
    }
    signInWithEmail()
  }

  const goToForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  }

  const goToSignupPage = () => {
    router.push('/(auth)/signuppage');
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Login</Text>

      {/* Email Label and Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Value"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Label and Input */}
      <View style={[styles.inputContainer, styles.passwordContainer]}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Value"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={goToForgotPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign-Up Section */}
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity onPress={goToSignupPage}>
          <Text style={styles.link}>Sign Up</Text>
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
  passwordContainer: {
    marginBottom: 30, // Add more space specifically below the Password input
  },
  label: {
    fontSize: 18,
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
  loginButton: {
    width: '85%',
    maxWidth: 400,
    height: width > 400 ? 50 : 45,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    fontSize: 14,
    marginTop: 5,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
});
