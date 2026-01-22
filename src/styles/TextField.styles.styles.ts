import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF1F3',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    tintColor: '#666',
    width: 20,
    height: 20,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: 'red',
    includeFontPadding: false,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
