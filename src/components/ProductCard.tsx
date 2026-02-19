import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
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
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        {item.stock === 0 && (
          <Text style={styles.outOfStock}>Out of Stock</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
