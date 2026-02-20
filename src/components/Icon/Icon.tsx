import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import OnBoardFirst from '../../../assets/icons/onboardfirst.svg';
import OnBoardSecond from '../../../assets/icons/onboardsecond.svg';
import Logo from '../../../assets/icons/logo.svg';
import EyeOpen from '../../../assets/icons/eyeOpen.svg';
import EyeClosed from '../../../assets/icons/eyeClosed.svg';
import Calendar from '../../../assets/icons/calendar.svg';
import Home from '../../../assets/icons/home.svg';
import Cart from '../../../assets/icons/cart.svg';
import Order from '../../../assets/icons/order.svg';
import heart from '../../../assets/icons/heart.svg';
import fillHeart from '../../../assets/icons/fill-heart.svg';

export type IconName =
  | 'onboardfirst'
  | 'onboardsecond'
  | 'logo'
  | 'eyeOpen'
  | 'eyeClosed'
  | 'calendar'
  | 'home'
  | 'cart'
  | 'order'
  | 'heart'
  | 'fillHeart';

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
  eyeOpen: EyeOpen,
  eyeClosed: EyeClosed,
  calendar: Calendar,
  home: Home,
  cart: Cart,
  order: Order,
  heart: heart,
  fillHeart: fillHeart,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  width,
  height,
  color = '#052224',
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
      stroke={color}
      style={style}
    />
  );
};

export default Icon;
