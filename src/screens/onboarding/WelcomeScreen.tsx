import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import BottomSheet from '../../components/BottomSheet';
import Icon from '../../components/Icon';
import Pagination from '../../components/Pagination';
import { onboardingData } from './data';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Screens from '../Screen';
import { styles } from '../../styles/WelcomeScreen.styles';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate(Screens.GetStartedScreen);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.page}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.subtitleText}>{item.subtitle}</Text>

      <Icon name={item.icon} size={287} style={styles.onboardIcon} />
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
        />

        <Pagination
          total={onboardingData.length}
          currentIndex={currentIndex}
          onNext={handleNext}
        />
      </BottomSheet>
    </View>
  );
};

export default WelcomeScreen;
