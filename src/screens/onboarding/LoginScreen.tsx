import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../styles/LoginScreen.styles';
import BottomSheet from '../../components/BottomSheet';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Screens from '../Screen';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<any>>();

  const loginHandler = () => {
    navigation.navigate(Screens.LoginScreen);
  };

  const signupHandler = () => {
    navigation.navigate(Screens.SignupScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <BottomSheet>
        <TextField
          label="Username Or Email"
          placeholder="example@example.com"
          value={email}
          onChangeText={setEmail}
          style={styles.textFieldEmail}
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          rightIcon="eyeClosed"
          style={styles.textFieldPassword}
        />

        <Button title="Log In" style={styles.loginBtn} onPress={loginHandler} />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title="Sign Up"
          style={styles.signupBtn}
          onPress={signupHandler}
          variant="soft"
        />
      </BottomSheet>
    </View>
  );
};

export default LoginScreen;
