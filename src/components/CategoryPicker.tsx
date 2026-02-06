import React from 'react';
import { Modal, Pressable, View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { CategoryModel } from '../models/CategoryModel';

interface Props {
  visible: boolean;
  categories: CategoryModel[];
  onClose: () => void;
  onSelect: (id?: string) => void;
}

const CategoryPicker = ({ visible, categories, onClose, onSelect }: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onSelect(undefined)}
          >
            <Text>All</Text>
          </TouchableOpacity>

          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryItem}
              onPress={() => onSelect(cat.id)}
            >
              <Text>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default CategoryPicker;
