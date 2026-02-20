import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';

import Screens from './src/screens/Screen';
import LoginScreen from './src/screens/onboarding/LoginScreen';
import SignupScreen from './src/screens/onboarding/SignupScreen';
import HomeScreen from './src/screens/tabs/home/HomeScreen';
import CartScreen from './src/screens/tabs/cart/CartScreen';
import OrdersScreen from './src/screens/tabs/order/OrdersScreen';
import ProductDetailsScreen from './src/screens/tabs/home/ProductDetailsScreen';
import CheckoutScreen from './src/screens/tabs/cart/CheckoutScreen';
import OrderSuccessScreen from './src/screens/tabs/cart/OrderSuccessScreen';
import OrderDetailsScreen from './src/screens/tabs/order/OrderDetailsScreen';
import WishlistScreen from './src/screens/tabs/wishlist/WishlistScreen';

import { colors } from './src/theme/colors';
import { FontFamily } from './src/theme/fonts';
import TabIcon from './src/components/TabIcon';
import { useAuthStore } from './src/store/authStore';

/* ------------------ TYPES ------------------ */
export type RootStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  MainTabs: undefined;
  ProductDetailsScreen: { productId: string; headerTitle: string };
  CheckoutScreen: undefined;
  OrderSuccessScreen: { orderId: string; amount: Number };
  OrderDetailsScreen: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/* ------------------ APP ROOT ------------------ */
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const { status, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (status === 'loading') {
    return null; // Splash screen here
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          status === 'authenticated' ? Screens.MainTabs : Screens.LoginScreen
        }
      >
        <Stack.Screen
          name={Screens.LoginScreen}
          component={LoginScreen}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name={Screens.SignupScreen}
          component={SignupScreen}
          options={{ headerShown: true, headerTransparent: true }}
        />
        <Stack.Screen
          name={Screens.MainTabs}
          component={TabNavigator}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          options={({ route }) => ({
            headerShown: true,
            headerTransparent: true,
            headerTitle: route.params.headerTitle,
            headerTintColor: colors.lightGreen,
          })}
          name={Screens.ProductDetailsScreen}
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Shipping Address',
            headerTintColor: colors.lightGreen,
          }}
          name={Screens.CheckoutScreen}
          component={CheckoutScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={Screens.OrderSuccessScreen}
          component={OrderSuccessScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: colors.lightGreen,
          }}
          name={Screens.OrderDetailsScreen}
          component={OrderDetailsScreen}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

/* ------------------ TAB NAVIGATOR ------------------ */
const TabNavigator = React.memo(() => (
  <Tab.Navigator screenOptions={commonTabOptions}>
    <Tab.Screen
      name={Screens.HomeScreen}
      component={HomeScreen}
      options={{ title: 'Home', tabBarIcon: renderHomeIcon }}
    />
    <Tab.Screen
      name={Screens.CartScreen}
      component={CartScreen}
      options={{ title: 'Cart', tabBarIcon: renderCartIcon }}
    />
    <Tab.Screen
      name={Screens.WishlistScreen}
      component={WishlistScreen}
      options={{ title: 'Wishlist', tabBarIcon: renderWishlistIcon }}
    />
    <Tab.Screen
      name={Screens.OrdersScreen}
      component={OrdersScreen}
      options={{
        title: 'Orders',
        tabBarIcon: renderOrderIcon,
        headerTitle: '',
      }}
    />
  </Tab.Navigator>
));

/* ------------------ TAB OPTIONS ------------------ */
const commonTabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.lightGreen,
  tabBarInactiveTintColor: colors.darkModeGreenBar,
  tabBarLabelStyle: {
    fontFamily: FontFamily.poppins.light,
    fontSize: 12,
    marginTop: 18,
  },
  tabBarItemStyle: {
    marginTop: 25,
  },
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.darkModeGreenBar,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: 100,
    paddingBottom: 20,
    elevation: 10,
  },
};

/* ------------------ ICON RENDERERS ------------------ */
const renderHomeIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    activeIcon={require('./assets/tabs/home/home.png')}
    inactiveIcon={require('./assets/tabs/home/home.png')}
  />
);

const renderCartIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    activeIcon={require('./assets/tabs/cart/cart.png')}
    inactiveIcon={require('./assets/tabs/cart/cart.png')}
  />
);

const renderOrderIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    activeIcon={require('./assets/tabs/order/order.png')}
    inactiveIcon={require('./assets/tabs/order/order.png')}
  />
);

const renderWishlistIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    activeIcon={require('./assets/tabs/wishlist/wishlist.png')} // Reusing home icon for now or heart if available
    inactiveIcon={require('./assets/tabs/wishlist/wishlist.png')}
  />
);
