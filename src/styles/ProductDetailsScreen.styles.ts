import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  scrollview: {
    paddingBottom: 120,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.lightGreen,
  },

  image: {
    width: width,
    height: 320,
  },
  content: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    color: colors.mainGreen,
    fontFamily: FontFamily.poppins.semiBold,
  },
  rating: {
    color: colors.lightGreen,
  },
  stock: {
    fontFamily: FontFamily.poppins.medium,
    color: colors.mainGreen,
    fontSize: 14,
  },
  optionGroup: {
    marginBottom: 12,
  },
  optionLabel: {
    color: colors.lightGreen,
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.lightGreen,
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipActive: {
    backgroundColor: colors.mainGreen,
  },
  description: {
    color: colors.lightGreen,
    lineHeight: 22,
    marginTop: 12,
  },
  readMore: {
    color: colors.mainGreen,
    marginTop: 6,
  },
  addButton: {
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.mainGreen,
    width: 10,
    height: 10,
  },
});
