import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  page: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },

  titleText: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 30,
    lineHeight: 39,
    marginHorizontal: 30,
    marginTop: 30,
    textAlign: 'center',
    includeFontPadding: false,
  },

  subtitleText: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 30,
    lineHeight: 39,
    textAlign: 'center',
    includeFontPadding: false,
  },

  onboardIcon: {
    alignItems: 'flex-end',
  },
});
