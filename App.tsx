import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import GetStartedScreen from './src/screens/onboarding/GetStartedScreen';
import Screens from './src/screens/Screen';
import LoginScreen from './src/screens/onboarding/LoginScreen';
import SignupScreen from './src/screens/onboarding/SignupScreen';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  GetStartedScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  //  OTPScreen: { number: string; signUpResponse: SignUpResponse };
  // PersonalDetails: { number: string; signUpResponse: SignUpResponse };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* <Stack.Screen
          name={Screens.WelcomeScreen}
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Screens.GetStartedScreen}
          component={GetStartedScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
