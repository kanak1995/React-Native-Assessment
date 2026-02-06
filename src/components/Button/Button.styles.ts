import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    width: 207,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  solid: {
    backgroundColor: colors.mainGreen,
  },

  soft: {
    backgroundColor: colors.lightGreen,
  },

  text: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 16,
    lineHeight: 20,
    includeFontPadding: false,
    textAlign: 'center',
  },

  solidText: {
    color: colors.lettersAndIcons,
  },

  softText: {
    color: colors.darkModeGreenBar,
  },
});
