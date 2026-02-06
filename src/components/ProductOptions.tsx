import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ProductDetailsScreen.styles';

interface Props {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (v: string) => void;
}

const ProductOptions = ({ label, options, selected, onSelect }: Props) => {
  if (!options.length) return null;

  return (
    <View style={styles.optionGroup}>
      <Text style={styles.optionLabel}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.optionChip,
              selected === opt && styles.optionChipActive,
            ]}
            onPress={() => onSelect(opt)}
          >
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProductOptions;
