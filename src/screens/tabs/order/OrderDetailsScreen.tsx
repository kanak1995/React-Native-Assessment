import { styles } from '../../../styles/OrderDetailsScreen.styles';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOrderDetails } from '../../../hooks/useOrderDetails';

type RouteParams = {
  OrderDetailsScreen: {
    orderId: string;
  };
};

const OrderDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'OrderDetailsScreen'>>();
  const { top } = useSafeAreaInsets();
  const { order, loading } = useOrderDetails(route.params.orderId);

  if (!order && loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (!order) {
    return <Text style={styles.loading}>Order not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Order Info */}
      <View style={{ marginTop: top + 70 }}>
        <View style={styles.section}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.status}>Status: {order.status}</Text>
          <Text style={styles.amount}>Total: ₹{order.amount}</Text>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>

          <FlatList
            data={order.items}
            keyExtractor={(item, index) => `${item.productId}-${index}`}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                {item.thumbnail && (
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.image}
                  />
                )}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemMeta}>
                    Qty: {item.qty} × ₹{item.price}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;
