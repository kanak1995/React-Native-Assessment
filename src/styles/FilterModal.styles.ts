import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.lettersAndIcons,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    minHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  clearText: {
    color: 'white',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: 'white',
    fontSize: 14,
  },
  toText: {
    marginHorizontal: 12,
    color: '#AAA',
  },
  sortOptions: {
    gap: 12,
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
  optionSelected: {
    borderColor: colors.mainGreen,
    backgroundColor: colors.lightGreen,
  },
  optionText: {
    fontSize: 14,
    color: 'white',
  },
  optionTextSelected: {
    color: colors.mainGreen,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: colors.mainGreen,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
