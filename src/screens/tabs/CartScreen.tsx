import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>

      <View style={styles.summary}>
        <Text style={styles.text}>Subtotal: ₹117.99</Text>
        <Text style={styles.text}>Tax: ₹10.62</Text>
        <Text style={styles.total}>Total: ₹128.61</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
    padding: 20,
  },
  header: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 24,
    color: colors.lightGreen,
  },
  summary: {
    marginTop: 30,
  },
  text: {
    color: colors.lightGreen,
    marginBottom: 6,
  },
  total: {
    marginTop: 10,
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.mainGreen,
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
