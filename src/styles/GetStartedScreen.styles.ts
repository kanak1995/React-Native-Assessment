import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    marginTop: 274,
    // backgroundColor: 'red',
  },
  finWise: {
    color: colors.mainGreen,
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 52,
    lineHeight: 65,
    textAlign: 'center',
    includeFontPadding: false,
  },
  loremText: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.regular,
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: -5,
  },
  loginBtn: {
    marginTop: 56,
  },
  signupBtn: {
    marginTop: 14,
  },
});
