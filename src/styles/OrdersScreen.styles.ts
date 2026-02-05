import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  orderHistory: {
    fontFamily: FontFamily.poppins.bold,
    color: colors.backgroundLightGreen,
    fontSize: 25,
    marginTop: 60,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 16,
    marginTop: 25,
  },
  contentContainerStyle: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.backgroundDarkGreenDark,
  },
  amount: {
    marginTop: 8,
    fontFamily: FontFamily.poppins.bold,
    color: colors.mainGreen,
    fontSize: 20,
  },
  date: {
    marginTop: 4,
    fontFamily: FontFamily.poppins.regular,
    color: colors.lettersAndIcons,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#ddd',
  },
  delivered: {
    backgroundColor: '#C8F7DC',
  },
  processing: {
    backgroundColor: '#FFE7A3',
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontFamily.poppins.medium,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.lightGreen,
  },
});
