import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../../styles/CheckoutScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextField from '../../../components/TextField';
import { useCheckout } from '../../../hooks/useCheckout';

const CheckoutScreen = () => {
  const { top } = useSafeAreaInsets();
  const { form, paymentMethod, setPaymentMethod, onChange, onPlaceOrder } =
    useCheckout();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        <Text>Payment Method</Text>

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
