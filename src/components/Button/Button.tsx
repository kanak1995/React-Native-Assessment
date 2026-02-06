import React from 'react';
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ButtonProps,
} from 'react-native';
import { styles } from './Button.styles';

type ButtonVariant = 'solid' | 'soft';
// const DEFAULT_WIDTH = 207;
// const DEFAULT_HEIGHT = 45;

interface ButtonsProps extends ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  // width?: number;
  // height?: number;
}

const Button: React.FC<ButtonsProps> = ({
  title,
  onPress,
  variant = 'solid',
  style,
  textStyle,
  // width = DEFAULT_WIDTH,
  // height = DEFAULT_HEIGHT,
  ...rest
}) => {
  const isSolid = variant === 'solid';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.container,
        // {
        //   width,
        //   height,
        //   borderRadius: height / 2, // auto pill shape
        // },
        isSolid ? styles.solid : styles.soft,
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          isSolid ? styles.solidText : styles.softText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
