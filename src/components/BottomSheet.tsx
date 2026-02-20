import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type BottomSheetProps = {
  height?: number | `${number}%`;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  height,
  children,
  style,
}) => {
  return (
    <View style={[styles.container, height ? { height } : {}, style]}>
      {children}
    </View>
  );
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
