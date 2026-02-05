import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },

  searchBar: {
    borderRadius: 14,
    backgroundColor: colors.lightGreen,
    height: 45,
    marginTop: 60,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 12,
    flexDirection: 'row',
  },
  searchInput: {
    fontFamily: FontFamily.poppins.regular,
    color: colors.lettersAndIcons,
    marginLeft: 20,
  },
  categoryButton: {
    height: 45,
    marginLeft: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.backgroundDarkGreenDark,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    height: 140,
    borderRadius: 12,
  },
  title: {
    marginTop: 10,
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.backgroundDarkGreenDark,
  },
  price: {
    marginTop: 4,
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.mainGreen,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.lightGreen,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    width: '80%',
    paddingVertical: 12,
  },
  categoryItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
});
