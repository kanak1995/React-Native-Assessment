import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shipping Address</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Name, Phone</Text>
        <Text style={styles.text}>Address, City, PIN</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    padding: 20,
  },
  header: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 22,
    color: colors.lightGreen,
  },
  card: {
    marginTop: 20,
    backgroundColor: colors.lightGreen,
    padding: 16,
    borderRadius: 16,
  },
  text: {
    color: colors.backgroundDarkGreenDark,
  },
  button: {
    marginTop: 40,
    backgroundColor: colors.mainGreen,
    padding: 14,
    borderRadius: 14,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.backgroundDarkGreenDark,
  },
});
