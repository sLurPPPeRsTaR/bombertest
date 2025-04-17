import {StyleSheet, VirtualizedList} from 'react-native';
import React, {FC, useEffect} from 'react';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import ProductCard from './product/ProductCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigatorParamList} from '../navigation/AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppNavigatorParamList, 'Favorite'>;

const Favorite: FC<Props> = props => {
  const {isFavorite} = props.route.params;
  const {favorite} = useSelector((state: RootState) => state.favorite);
  const navigation = useNavigation<NavigationProp<AppNavigatorParamList>>();

  const onProductPress = (item: {id: number}) => {
    navigation.navigate('ProductDetail', {itemId: item.id});
  };

  useEffect(() => {
    if (favorite.length === 0) {
      navigation.goBack();
    }
    return () => {};
  }, [favorite.length, navigation]);

  return (
    <VirtualizedList
      contentContainerStyle={styles.virtualizedContentContainer}
      data={favorite}
      getItem={(data, index) => data[index]}
      getItemCount={data => data.length}
      keyExtractor={(item, _) => item.id}
      renderItem={({item}) => {
        return (
          <ProductCard
            item={item}
            isFavorite={isFavorite}
            onPress={() => onProductPress(item)}
          />
        );
      }}
    />
  );
};

export default Favorite;

const styles = StyleSheet.create({
  virtualizedContentContainer: {
    paddingBottom: 200,
  },
});
