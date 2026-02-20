import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import { useProductStore } from '../store/productStore';
import { styles } from '../styles/FilterModal.styles';
import BottomSheet from './BottomSheet';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const { minPrice, maxPrice, sortBy, sortOrder, setFilters, clearFilters } =
    useProductStore();

  const [tempMin, setTempMin] = useState(minPrice?.toString() ?? '');
  const [tempMax, setTempMax] = useState(maxPrice?.toString() ?? '');
  const [tempSort, setTempSort] = useState<typeof sortBy>(sortBy);
  const [tempOrder, setTempOrder] = useState<typeof sortOrder>(sortOrder);

  const handleApply = () => {
    setFilters({
      minPrice: tempMin ? parseInt(tempMin, 10) : undefined,
      maxPrice: tempMax ? parseInt(tempMax, 10) : undefined,
      sortBy: tempSort,
      sortOrder: tempOrder,
    });
    onClose();
  };

  const handleClear = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    clearFilters();
    setTempMin('');
    setTempMax('');
    setTempSort(undefined);
    setTempOrder('asc');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <BottomSheet style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Filters & Sort</Text>
                <TouchableOpacity onPress={handleClear}>
                  <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Price Range</Text>
                <View style={styles.priceInputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Min"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={tempMin}
                    onChangeText={setTempMin}
                  />
                  <Text style={styles.toText}>to</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Max"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={tempMax}
                    onChangeText={setTempMax}
                  />
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sort By Price</Text>
                <View style={styles.sortOptions}>
                  <TouchableOpacity
                    style={[
                      styles.option,
                      tempSort === 'price' &&
                        tempOrder === 'asc' &&
                        styles.optionSelected,
                    ]}
                    onPress={() => {
                      setTempSort('price');
                      setTempOrder('asc');
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempSort === 'price' &&
                          tempOrder === 'asc' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Lowest to Highest
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.option,
                      tempSort === 'price' &&
                        tempOrder === 'desc' &&
                        styles.optionSelected,
                    ]}
                    onPress={() => {
                      setTempSort('price');
                      setTempOrder('desc');
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempSort === 'price' &&
                          tempOrder === 'desc' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Highest to Lowest
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </BottomSheet>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
