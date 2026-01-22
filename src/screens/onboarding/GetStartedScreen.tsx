import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../styles/GetStartedScreen.styles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Screens from '../Screen';

const GetStartedScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const loginHandler = () => {
    navigation.navigate(Screens.LoginScreen);
  };
  const signupHandler = () => {
    navigation.navigate(Screens.SignupScreen);
  };

  return (
    <View style={styles.container}>
      <Icon name="logo" height={115} width={109} style={styles.logo} />
      <Text style={styles.finWise}>finWise</Text>
      <Text style={styles.loremText}>
        Lorem ipsum dolor sit amet, consectetur{'\n'}
        adipiscing elit, sed do eiusmod.
      </Text>
      <Button title="Log In" style={styles.loginBtn} onPress={loginHandler} />
      <Button
        title="Sign Up"
        style={styles.signupBtn}
        onPress={signupHandler}
        variant="soft"
      />
    </View>
  );
};

export default GetStartedScreen;
