import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders</Text>

      <TouchableOpacity style={styles.orderCard}>
        <Text style={styles.orderId}>#12345</Text>
        <Text style={styles.status}>Delivered</Text>
        <Text style={styles.amount}>₹128.61</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrdersScreen;

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
  orderCard: {
    marginTop: 20,
    backgroundColor: colors.lightGreen,
    padding: 16,
    borderRadius: 16,
  },
  orderId: {
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.backgroundDarkGreenDark,
  },
  status: {
    marginTop: 4,
    color: colors.mainGreen,
  },
  amount: {
    marginTop: 6,
    fontFamily: FontFamily.poppins.semiBold,
  },
});
