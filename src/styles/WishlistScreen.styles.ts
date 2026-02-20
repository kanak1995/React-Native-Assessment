import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  header: {
    marginTop: 60,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: FontFamily.poppins.semiBold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.regular,
  },
});
