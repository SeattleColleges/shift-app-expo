import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window'); // Get the current screen width

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    validateForm();
  }, [name, lastName, email, password, confirmPassword, department, supervisor]);

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailPattern.test(email);
    setIsEmailValid(emailIsValid);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordIsValid = passwordPattern.test(password);
    setIsPasswordValid(passwordIsValid);

    let formValid = true;
    if (!name) { formValid = false; }
    if (!lastName) { formValid = false; }
    if (!emailIsValid) { formValid = false; }
    if (!passwordIsValid) { formValid = false; }
    if (!confirmPassword) { formValid = false; }
    if (!department) { formValid = false; }
    if (!supervisor) { formValid = false; }
    if (password !== confirmPassword) { formValid = false; }

    setIsFormValid(formValid);
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', `Name: ${name} ${middleName} ${lastName}\nEmail: ${email}`);
    // Add sign-up logic here
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Middle Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Middle Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Middle Name"
          placeholderTextColor="#888"
          value={middleName}
          onChangeText={setMiddleName}
        />
      </View>

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (text) { // Check if email input is not empty
              setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text));
            } else {
              setIsEmailValid(true); //email is valid if empty
            }
          }}
          keyboardType="email-address"
        />
        {!isEmailValid && email.length > 0 && <Text style={styles.errorText}>Wrong email format</Text>}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!isPasswordValid && password.length > 0 && (
          <Text style={styles.errorText}>
            Password must be at least 8 characters long and include a special character, a capital letter, and a number.
          </Text>
        )}
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {password !== confirmPassword && <Text style={styles.errorText}>Passwords do not match</Text>}
      </View>

      {/* Department Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          placeholder="Department"
          placeholderTextColor="#888"
          value={department}
          onChangeText={setDepartment}
        />
      </View>

      {/* Supervisor Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Supervisor</Text>
        <TextInput
          style={styles.input}
          placeholder="Supervisor"
          placeholderTextColor="#888"
          value={supervisor}
          onChangeText={setSupervisor}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.signUpButton, !isFormValid && { backgroundColor: '#ccc' }]}
        onPress={handleSignUp}
        disabled={!isFormValid}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <Link href="/loginpage" style={styles.link}>
          Login
        </Link>
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
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