import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';

import Icon, { IconName } from '../Icon/Icon';
import { styles } from './TextField.styles';

interface TextFieldProps extends TextInputProps {
  /** Optional label above input */
  label?: string;

  /** Input value */
  value: string;

  /** Change handler */
  onChangeText: (text: string) => void;

  /** Right-side icon name */
  rightIcon?: IconName;

  /** Right icon press action */
  onRightIconPress?: () => void;

  /** Square icon size */
  rightIconSize?: number;

  /** Custom icon width */
  rightIconWidth?: number;

  /** Custom icon height */
  rightIconHeight?: number;

  /** Password field */
  secureTextEntry?: boolean;

  /** wrapper style */
  style?: ViewStyle;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,

  rightIcon,
  onRightIconPress,
  rightIconSize = 22,
  rightIconWidth,
  rightIconHeight,

  secureTextEntry = false,
  style,
  editable = true,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handlePasswordToggle = () => {
    setIsSecure(prev => !prev);
  };

  const isPasswordField = secureTextEntry && rightIcon;

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8FAFA6"
          secureTextEntry={isSecure}
          editable={editable}
          style={styles.input}
          {...rest}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={isPasswordField ? handlePasswordToggle : onRightIconPress}
            activeOpacity={0.7}
            disabled={!isPasswordField && !onRightIconPress}
          >
            <Icon
              name={
                isPasswordField
                  ? isSecure
                    ? 'eyeClosed'
                    : 'eyeOpen'
                  : rightIcon
              }
              size={
                rightIconWidth || rightIconHeight ? undefined : rightIconSize
              }
              width={rightIconWidth}
              height={rightIconHeight}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextField;

// {/* <TextField
//   label="Username Or Email"
//   placeholder="example@example.com"
//   value={email}
//   onChangeText={setEmail}
// />

// <TextField
//   label="Password"
//   placeholder="********"
//   value={password}
//   onChangeText={setPassword}
//   secureTextEntry
//   rightIcon="eyeClosed"
// />

// <TextField
//   label="Date"
//   value={date}
//   editable={false}
//   rightIcon="calendar"
//   rightIconWidth={20}
//   rightIconHeight={18}
//   onRightIconPress={openDatePicker}
// /> */}
