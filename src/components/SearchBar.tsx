import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { colors } from '../theme/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  categoryLabel: string;
  onCategoryPress: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  categoryLabel,
  onCategoryPress,
}: Props) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search products"
        placeholderTextColor={colors.lettersAndIcons}
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.categoryButton} onPress={onCategoryPress}>
        <Text style={styles.categoryText}>{categoryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
