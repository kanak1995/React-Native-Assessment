import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  focused: boolean;
  activeIcon: any;
  inactiveIcon: any;
};

export default function TabIcon({ focused, activeIcon, inactiveIcon }: Props) {
  return (
    <View style={[styles.container, focused && styles.activeContainer]}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        style={[styles.icon, focused && styles.activeIcon]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 57,
    height: 53,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeContainer: {
    backgroundColor: colors.lightGreen, // your green pill
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF',
  },
  activeIcon: {
    tintColor: colors.backgroundDarkGreenDark,
  },
});
