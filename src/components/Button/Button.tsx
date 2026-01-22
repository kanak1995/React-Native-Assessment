import React from 'react';
import { Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { styles } from './Button.styles';

type ButtonVariant = 'solid' | 'soft';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'solid',
  style,
  textStyle,
}) => {
  const isSolid = variant === 'solid';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.container,
        isSolid ? styles.solid : styles.soft,
        style,
      ]}
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
