import React from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';
import { styles } from '../styles/ProductDetailsScreen.styles';

const { width } = Dimensions.get('window');

interface Props {
  images: string[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  carouselRef: any;
}

const ImageCarousel = ({
  images,
  activeIndex,
  setActiveIndex,
  carouselRef,
}: Props) => {
  return (
    <>
      <FlatList
        ref={carouselRef}
        data={images}
        horizontal
        pagingEnabled
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e =>
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />

      {images.length > 1 && (
        <View style={styles.dotsContainer}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </>
  );
};

export default ImageCarousel;
