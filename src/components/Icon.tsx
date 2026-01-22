import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import OnBoardFirst from '../../assets/icons/onboardfirst.svg';
import OnBoardSecond from '../../assets/icons/onboardsecond.svg';
import Logo from '../../assets/icons/logo.svg';
// import Login from '../../assets/icons/login.svg';
// import Signup from '../../assets/icons/signup.svg';

type IconName = 'onboardfirst' | 'onboardsecond' | 'logo';

interface IconProps {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const ICON_MAP: Record<IconName, React.FC<any>> = {
  onboardfirst: OnBoardFirst,
  onboardsecond: OnBoardSecond,
  logo: Logo,
  // signup: Signup,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  width,
  height,
  color = '#0000',
  style,
}) => {
  const SvgIcon = ICON_MAP[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" does not exist`);
    return null;
  }

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <SvgIcon
      width={finalWidth}
      height={finalHeight}
      fill={color}
      style={style}
    />
  );
};

export default Icon;
