import React, { useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { styles } from '../../styles/SignUpScreen.styles';
import BottomSheet from '../../components/BottomSheet';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import Screens from '../Screen';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { registerApi } from '../../api/authapi';
import { saveToken } from '../../utils/storage';
import Screens from '../Screen';

const isValidName = (name: string) => name.trim().length >= 2;

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const navigation = useNavigation<NavigationProp<any>>();

  const signupHandler = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      const res = await registerApi(name, email, password);
      await saveToken(res.token);
      navigation.navigate(Screens.MainTabs);
    } catch (err: any) {
      Alert.alert(
        'Registation Failed',
        err?.message || 'Something went wrong',
        [{ text: 'OK' }],
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

    // First Name
    if (!name.trim()) {
      setNameError('First name is required');
      isValid = false;
    } else if (!isValidName(name)) {
      setNameError('Enter at least 2 characters');
      isValid = false;
    } else {
      setNameError('');
    }

    // Email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('Min 8 chars, 1 uppercase, 1 lowercase & 1 number');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (!isValidPassword(password)) {
      setPasswordError('Min 8 chars, 1 uppercase, 1 lowercase & 1 number');
    } else {
      setPasswordError('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <Text style={styles.welcome}>Create Account</Text>
      <BottomSheet>
        <TextField
          // label="Username Or Email"
          placeholder="Enter Your First Name"
          value={name}
          onChangeText={text => {
            setName(text);
            if (nameError) setNameError('');
          }}
          error={nameError}
          style={styles.textFieldFName}
        />
        <TextField
          // label="Username Or Email"
          placeholder="example@example.com"
          returnKeyType="done"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          onBlur={handleEmailBlur}
          error={emailError}
          style={styles.textFieldEmail}
        />

        <TextField
          // label="Password"
          placeholder="Enter your password"
          returnKeyType="done"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
          onBlur={handlePasswordBlur}
          secureTextEntry
          rightIcon="eyeClosed"
          error={passwordError}
          style={styles.textFieldPassword}
        />
        <View style={styles.button}>
          <Button
            title="Create Account"
            width={200}
            onPress={signupHandler}
            variant="soft"
          />
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};
export default SignupScreen;
