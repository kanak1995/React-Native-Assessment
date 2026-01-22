import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors } from '../theme/colors';
import { FontFamily } from '../theme/fonts';

interface PaginationProps {
  total: number;
  currentIndex: number;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentIndex,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      {/* Next Button */}
      <Pressable onPress={onNext}>
        <Text style={styles.nextText}>Next</Text>
      </Pressable>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  nextText: {
    fontFamily: FontFamily.poppins.semiBold,
    fontSize: 22,
    color: colors.lightGreen,
    marginBottom: 12,
    includeFontPadding: false,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: colors.lightGreen,
  },
  inactiveDot: {
    borderWidth: 2,
    borderColor: colors.lightGreen,
    backgroundColor: 'transparent',
  },
});
