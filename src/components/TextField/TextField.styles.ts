import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  label: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.medium,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
    marginLeft: 16,
    includeFontPadding: false,
  },

  inputContainer: {
    height: 41,
    backgroundColor: colors.lightGreen,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 34,
    paddingRight: 25,
  },

  input: {
    flex: 1,
    color: colors.lettersAndIcons,
    fontFamily: FontFamily.poppins.regular,
    fontSize: 16,
    lineHeight: 22,
    includeFontPadding: false,
    // backgroundColor: 'red',
    height: '100%',
  },
});
