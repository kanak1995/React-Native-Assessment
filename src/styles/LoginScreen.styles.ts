import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 30,
    lineHeight: 34,
    color: colors.lightGreen,
    marginBottom: 65,
    includeFontPadding: false,
  },
  textFieldEmail: {
    paddingHorizontal: 36,
    paddingTop: 90,
  },
  textFieldPassword: {
    paddingHorizontal: 36,
    paddingTop: 22,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingHorizontal: 36,
  },
  loginBtn: {
    width: 150,
  },
  forgotBtn: {
    marginTop: 15,
  },
  forgotText: {
    fontFamily: FontFamily.poppins.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.lightGreen,
    alignSelf: 'center',
    includeFontPadding: false,
  },
  signupBtn: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
