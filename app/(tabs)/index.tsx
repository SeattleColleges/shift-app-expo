import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../login/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={() => <Text>Forgot Password Page</Text>} />
        <Stack.Screen name="SignUp" component={() => <Text>Sign Up Page</Text>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
