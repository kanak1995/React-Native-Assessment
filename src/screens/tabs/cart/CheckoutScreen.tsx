import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles } from '../../../styles/CheckoutScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextField from '../../../components/TextField';
import { placeOrder } from '../../../api/checkout.api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Screens from '../../Screen';

const CheckoutScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD'>('COD');
  const navigation = useNavigation<NavigationProp<any>>();
  const { top } = useSafeAreaInsets();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    line1: '',
    city: '',
    postalCode: '',
  });

  const onChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.line1 ||
      !form.city ||
      !form.postalCode
    ) {
      Alert.alert('Validation Error', 'Please fill all address fields');
      return false;
    }

    if (form.phone.length < 8) {
      Alert.alert('Validation Error', 'Invalid phone number');
      return false;
    }

    return true;
  };

  const onPlaceOrder = async () => {
    if (!validate()) return;

    try {
      const res = await placeOrder({
        address: {
          name: form.name,
          phone: form.phone,
          line1: form.line1,
          city: form.city,
          postalCode: form.postalCode,
          country: 'IN',
        },
        payment: {
          method: paymentMethod,
        },
      });
      console.log('orderId', res.orderId);
      console.log('amount', res.amount);
      console.log('status', res.status);
      console.log('createdAt', res.createdAt);

      navigation.navigate(Screens.OrderSuccessScreen, {
        orderId: res.orderId,
        amount: res.amount,
      });
    } catch (err) {
      Alert.alert('Order Failed', 'Please try again');
      console.error(err);
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Text style={styles.header}>Shipping Address</Text> */}
      <View style={{ marginTop: top + 70 }}>
        <TextField
          placeholder="Enter Your Name*"
          returnKeyType="done"
          value={form.name}
          onChangeText={text => onChange('name', text)}
          style={styles.input}
        />

        <TextField
          placeholder="Enter Your Phone Number*"
          returnKeyType="done"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={text => onChange('phone', text)}
          style={styles.input}
        />

        <TextField
          placeholder="Enter Your Address Line*"
          returnKeyType="done"
          value={form.line1}
          onChangeText={text => onChange('line1', text)}
          style={styles.input}
        />

        <TextField
          placeholder="Enter Your City*"
          returnKeyType="done"
          value={form.city}
          onChangeText={text => onChange('city', text)}
          style={styles.input}
        />

        <TextField
          placeholder="Enter Your Postal Code*"
          returnKeyType="done"
          keyboardType="number-pad"
          value={form.postalCode}
          onChangeText={text => onChange('postalCode', text)}
          style={styles.input}
        />

        <Text style={styles.header}>Payment Method</Text>

        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'COD' && styles.paymentActive,
            ]}
            onPress={() => setPaymentMethod('COD')}
          >
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'CARD' && styles.paymentActive,
            ]}
            onPress={() => setPaymentMethod('CARD')}
          >
            <Text style={styles.paymentText}>Mock Card</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={onPlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;
