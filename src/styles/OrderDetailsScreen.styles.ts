import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    padding: 16,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
  },
  section: {
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  orderId: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 16,
    color: colors.backgroundDarkGreenDark,
  },
  status: {
    marginTop: 4,
    fontFamily: FontFamily.poppins.medium,
    color: colors.lettersAndIcons,
  },
  amount: {
    marginTop: 4,
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.mainGreen,
  },
  sectionTitle: {
    fontFamily: FontFamily.poppins.semiBold,
    marginBottom: 12,
    color: colors.backgroundDarkGreenDark,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.backgroundDarkGreenDark,
  },
  itemMeta: {
    marginTop: 4,
    fontFamily: FontFamily.poppins.regular,
    color: colors.lettersAndIcons,
  },
});
