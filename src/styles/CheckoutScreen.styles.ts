import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    paddingHorizontal: 30,
  },
  input: {
    paddingTop: 15,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paymentOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  paymentActive: {
    backgroundColor: colors.mainGreen,
  },
  paymentText: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.backgroundDarkGreenDark,
  },
  placeOrderBtn: {
    marginTop: 24,
    backgroundColor: colors.mainGreen,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  placeOrderText: {
    fontFamily: FontFamily.poppins.semiBold,
    color: '#fff',
    fontSize: 16,
  },
});
