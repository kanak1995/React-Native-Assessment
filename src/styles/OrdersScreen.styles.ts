import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
  orderHistory: {
    fontFamily: FontFamily.poppins.bold,
    color: colors.backgroundLightGreen,
    fontSize: 25,
    marginTop: 60,
    alignSelf: 'center',
  },
  logoutText: {
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.backgroundLightGreen,
    fontSize: 15,
    marginTop: 70,
    marginLeft: 30,
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
    backgroundColor: '#d8b7b7',
  },
  delivered: {
    backgroundColor: '#8de8b5',
  },
  processing: {
    backgroundColor: '#eecf78',
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontFamily.poppins.medium,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 20,
  },
});
