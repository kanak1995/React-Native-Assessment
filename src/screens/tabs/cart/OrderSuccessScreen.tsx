import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/OrderSuccessScreen.styles';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import Screens from '../../Screen';

type RouteParams = {
  CheckoutResponse: {
    orderId: string;
    amount: number;
  };
};

const OrderSuccessScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'CheckoutResponse'>>();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>Order Placed Successfully</Text>

      <Text style={styles.text}>Order ID: {route.params.orderId}</Text>
      <Text style={styles.text}>
        Amount Paid: ₹{route.params.amount.toString()}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(Screens.MainTabs, {
            screen: Screens.OrdersScreen,
          })
        }
      >
        <Text style={styles.buttonText}>View Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() =>
          navigation.navigate(Screens.MainTabs, {
            screen: Screens.HomeScreen,
          })
        }
      >
        <Text style={styles.secondaryText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessScreen;
