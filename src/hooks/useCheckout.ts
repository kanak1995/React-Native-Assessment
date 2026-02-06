import { useState } from 'react';
import { Alert } from 'react-native';
import { placeOrder } from '../api/checkout.api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Screens from '../screens/Screen';

type PaymentMethod = 'COD' | 'CARD';

export function useCheckout() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');

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

      navigation.navigate(Screens.OrderSuccessScreen, {
        orderId: res.orderId,
        amount: res.amount,
      });
    } catch (err) {
      Alert.alert('Order Failed', 'Please try again');
      console.error(err);
    }
  };

  return {
    form,
    paymentMethod,
    setPaymentMethod,
    onChange,
    onPlaceOrder,
  };
}
