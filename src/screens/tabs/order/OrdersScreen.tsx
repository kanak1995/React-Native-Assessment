import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from '../../../styles/OrdersScreen.styles';
import Screens from '../../Screen';
import OrderItem from '../../../components/OrderItem';
import { useOrders } from '../../../hooks/useOrders';

const OrdersScreen = () => {
  const { orders, loading, refreshing, onRefresh, onLoadMore, logoutHandle } =
    useOrders();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderHistory}>Order History</Text>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={logoutHandle}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            onPress={() =>
              navigation.navigate(Screens.OrderDetailsScreen, {
                orderId: item.id,
              })
            }
          />
        )}
        contentContainerStyle={[
          styles.contentContainerStyle,
          orders.length === 0 && !loading && styles.emptyContainer,
        ]}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No orders found</Text> : null
        }
      />
    </View>
  );
};

export default OrdersScreen;
