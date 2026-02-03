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
  textFieldFName: {
    paddingHorizontal: 36,
    paddingTop: 90,
  },
  textFieldEmail: {
    paddingHorizontal: 36,
    paddingTop: 30,
  },
  textFieldPassword: {
    paddingHorizontal: 36,
    paddingTop: 30,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 36,
  },
  loginBtn: {
    marginTop: 40,
    alignSelf: 'center',
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
