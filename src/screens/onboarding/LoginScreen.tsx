import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
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
import { loginApi } from '../../api/auth.api';
import { saveToken, saveUserId } from '../../utils/storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<any>>();

  const loginHandler = async () => {
    try {
      const res = await loginApi(email.toLocaleLowerCase(), password);
      await saveToken(res.token);
      await saveUserId(res.user.id.toString());
      navigation.navigate(Screens.MainTabs);
    } catch (err: any) {
      console.log(err.message);
      Alert.alert('Login Failed', err?.message || 'Something went wrong', [
        { text: 'OK' },
      ]);
    }
  };

  const signupHandler = () => {
    navigation.navigate(Screens.SignupScreen);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
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
      <BottomSheet>
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
