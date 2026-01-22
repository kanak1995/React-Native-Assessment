import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type BottomSheetProps = {
  height?: number | `${number}%`;
  children?: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  height = '67%',
  children,
}) => {
  return <View style={[styles.container, { height }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.lettersAndIcons,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default BottomSheet;
