import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { colors } from '../theme/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  categoryLabel: string;
  onCategoryPress: () => void;
  onFilterPress?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  categoryLabel,
  onCategoryPress,
  onFilterPress,
}: Props) => {
  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBar]}>
        <TextInput
          placeholder="Search products"
          placeholderTextColor={colors.lettersAndIcons}
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={onCategoryPress}
        >
          <Text style={styles.categoryText}>{categoryLabel}</Text>
        </TouchableOpacity>
      </View>
      {onFilterPress && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
