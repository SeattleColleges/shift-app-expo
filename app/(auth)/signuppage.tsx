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

const { width } = Dimensions.get('window'); // Get the current screen width

export default function SignUpPage() {
  const [signUpObj, setSignUpObj] = React.useState({
    name:'', email:'', password:''
  });
  const [loading, setLoading] = React.useState(false);

  const handleSignUp = ():void => {
    async function signUpWithEmail():Promise<void> {
      setLoading(true)
      const { error } = await supabase?.auth.signUp({
        email: signUpObj.email,
        password: signUpObj.password,
        options: {
          data: {
            name: signUpObj.name,
          },
        },
      });

      if (error) {
        Alert.alert(error.message)
      }
      setLoading(false)
      console.log(`{name: ${signUpObj.name}, email: ${signUpObj.email}, password: ${signUpObj.password}}`)
    }
    signUpWithEmail();
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
          value={signUpObj.name}
          onChangeText={(value)=> setSignUpObj({...signUpObj, name: value}) }
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="value"
          placeholderTextColor="#888"
          value={signUpObj.email}
          onChangeText={(value)=> setSignUpObj({...signUpObj, email: value}) }
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
          value={signUpObj.password}
          onChangeText={(value)=> setSignUpObj({...signUpObj, password: value}) }
          secureTextEntry
        />
      </View>

      {/* Confirm Password Input: commented out for now */}
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

      {/* Department Input: commented out for now */}
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

      {/* Supervisor Input: commented out for now  */}
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
        <TouchableOpacity>
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
