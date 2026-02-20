import React, { useCallback, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from '../../styles/LoginScreen.styles';
import BottomSheet from '../../components/BottomSheet';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import Screens from '../Screen';
import { useAuthStore } from '../../store/authStore';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<any>>();

  const { login } = useAuthStore();

  const loginHandler = async () => {
    setError(null);
    try {
      await login(email, password);
      navigation.navigate(Screens.MainTabs);
    } catch (err: any) {
      console.log(err.message);
      setError(err?.message || 'Something went wrong');
    }
  };

  const signupHandler = () => {
    navigation.navigate(Screens.SignupScreen);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setError(null);
      return () => {};
    }, []),
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={styles.container}
    >
      <Text style={styles.welcome}>Welcome</Text>
      <BottomSheet style={styles.bottomSheet}>
        <TextField
          label="Username Or Email"
          placeholder="example@example.com"
          returnKeyType="done"
          value={email}
          onChangeText={setEmail}
          style={styles.textFieldEmail}
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          rightIcon="eyeClosed"
          style={styles.textFieldPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.button}>
          <Button
            title="Log In"
            variant="solid"
            onPress={loginHandler}
            style={styles.loginBtn}
          />
          <Button
            title="Create Account"
            onPress={signupHandler}
            variant="soft"
            style={styles.loginBtn}
          />
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
