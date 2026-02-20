import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { ProductModel } from '../models/ProductModel';
import { styles } from '../styles/HomeScreen.styles';
import { useWishlistStore } from '../store/wishlistStore';
import { colors } from '../theme/colors';
import Icon from './Icon';

interface Props {
  item: ProductModel;
  onPress: () => void;
}

const ProductCard = ({ item, onPress }: Props) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(item.id);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={onPress}
      accessibilityLabel={`Product: ${item.title}`}
      accessibilityRole="button"
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlist(item.id)}
        activeOpacity={0.7}
      >
        <Icon
          name={isFavorite ? 'fillHeart' : 'heart'}
          size={20}
          color={isFavorite ? 'red' : colors.darkModeGreenBar}
        />
      </TouchableOpacity>

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
