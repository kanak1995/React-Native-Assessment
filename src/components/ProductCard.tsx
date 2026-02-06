import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { ProductModel } from '../models/ProductModel';
import { styles } from '../styles/HomeScreen.styles';

interface Props {
  item: ProductModel;
  onPress: () => void;
}

const ProductCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={onPress}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
