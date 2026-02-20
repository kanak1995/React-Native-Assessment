import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    borderRadius: 14,
    backgroundColor: colors.lightGreen,
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
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
  filterButton: {
    height: 45,
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.mainGreen,
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
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.mainGreen,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  outOfStock: {
    fontFamily: FontFamily.poppins.medium,
    color: 'red',
    fontSize: 10,
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
  wishlistButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
