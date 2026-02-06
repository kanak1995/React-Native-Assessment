import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  header: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 20,
    color: colors.lightGreen,
    marginBottom: 20,
    marginTop: 60,
    alignSelf: 'center',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    color: colors.lightGreen,
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 20,
    textAlign: 'center',
  },
  loading: {
    color: colors.lightGreen,
    textAlign: 'center',
    marginTop: 40,
  },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.backgroundDarkGreenDark,
  },
  price: {
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.mainGreen,
    marginTop: 2,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.mainGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#fff',
    fontSize: 18,
  },
  qty: {
    marginHorizontal: 12,
    fontFamily: FontFamily.poppins.medium,
  },
  removeBtn: {
    marginLeft: 12,
  },
  removeText: {
    color: 'red',
    fontFamily: FontFamily.poppins.medium,
  },
  summary: {
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 10,
    marginTop: 8,
    marginBottom: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontFamily: FontFamily.poppins.regular,
  },
  value: {
    fontFamily: FontFamily.poppins.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 2,
  },
  totalLabel: {
    fontFamily: FontFamily.poppins.semiBold,
  },
  totalValue: {
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.mainGreen,
  },
  checkoutBtn: {
    marginTop: 8,
    marginBottom: 15,
    backgroundColor: colors.mainGreen,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  checkoutText: {
    fontFamily: FontFamily.poppins.semiBold,
    color: '#fff',
  },
});
