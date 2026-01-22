import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';

export const BUTTON_WIDTH = 207;
export const BUTTON_HEIGHT = 45;

export const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
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
