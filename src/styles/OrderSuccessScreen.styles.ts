import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 20,
    color: colors.lightGreen,
    marginBottom: 8,
  },
  text: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.lightGreen,
    marginBottom: 6,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.mainGreen,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontFamily: FontFamily.poppins.semiBold,
  },
  secondaryBtn: {
    marginTop: 12,
  },
  secondaryText: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.medium,
  },
});
