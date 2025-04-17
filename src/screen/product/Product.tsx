import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  getProductListByCategory,
  getProductBySearch,
} from '../../store/productAction';
import Button from '../../component/Button';
import Empty from '../../component/Empty';
import ProductCard from './ProductCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigatorParamList} from '../../navigation/AppNavigator';
import Padder from '../../component/Padder';
import {clearProductBySearch} from '../../store/productReducer';

const Product = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AppNavigatorParamList>>();

  const {productCategoryList, productListByCategory, productBySearch} =
    useSelector((state: RootState) => state.product);
  const {cart} = useSelector((state: RootState) => state.cart);
  const {favorite} = useSelector((state: RootState) => state.favorite);

  const [searchTextPayload, setSearchTextPayload] = useState<string>('');
  const [categoryPayload, setCategoryPayload] = useState<string | null>(
    'beauty',
  );

  useEffect(() => {
    dispatch(
      getProductListByCategory({
        category: categoryPayload ?? productCategoryList?.[0],
      }),
    );
  }, [categoryPayload, dispatch, productCategoryList]);

  const onCategoryPress = (item: string) => {
    setCategoryPayload(item);
  };

  const onProductPress = (item: {id: number}) => {
    navigation.navigate('ProductDetail', {itemId: item.id});
  };

  return (
    <SafeAreaView>
      <Padder style={styles.padderContainer}>
        <View style={styles.searchFavCartContainer}>
          <Text>Search Bar</Text>
          {favorite.length > 0 ? (
            <Button
              onPress={() => {
                navigation.navigate('Favorite', {isFavorite: true});
              }}
              style={styles.favCartButtonContainer}>
              Favorite
            </Button>
          ) : (
            <View style={styles.emptyFavCartButtonContainer} />
          )}
          {cart.length > 0 ? (
            <Button
              onPress={() => {
                navigation.navigate('Cart');
              }}
              style={styles.favCartButtonContainer}>
              Cart
            </Button>
          ) : (
            <View style={styles.emptyFavCartButtonContainer} />
          )}
        </View>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Search"
          onEndEditing={() => {
            if (searchTextPayload.length > 0) {
              dispatch(getProductBySearch({name: searchTextPayload}));
            } else {
              dispatch(clearProductBySearch());
            }
          }}
          onChangeText={e => {
            setSearchTextPayload(e);
          }}
        />
      </Padder>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={productCategoryList}
        renderItem={props => {
          const {item} = props;
          const isSelected =
            categoryPayload === item ? 'violet' : 'transparent';
          return (
            <Button
              style={[
                styles.categoryButtonContainer,
                {backgroundColor: isSelected},
              ]}
              onPress={() => onCategoryPress(item)}>
              {item}
            </Button>
          );
        }}
      />
      <VirtualizedList
        ListEmptyComponent={Empty}
        contentContainerStyle={styles.virtualizedContentContainer}
        data={productBySearch?.products ?? productListByCategory}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        keyExtractor={(item, _) => item.id}
        renderItem={props => {
          const {item} = props;
          return (
            <ProductCard item={item} onPress={() => onProductPress(item)} />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  contentContainer: {gap: 10, paddingHorizontal: 16, paddingBottom: 16},
  categoryButtonContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualizedContentContainer: {
    paddingBottom: 200,
  },
  padderContainer: {paddingVertical: 16},
  virButtonContainer: {borderWidth: 1, borderRadius: 8, padding: 8},
  mb24: {marginBottom: 24},
  mb12: {marginBottom: 12},
  fdr: {flexDirection: 'row'},
  f1: {flex: 1},
  textInputContainer: {backgroundColor: 'white', padding: 8, borderRadius: 8},
  searchFavCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  favCartButtonContainer: {
    backgroundColor: 'skyblue',
    padding: 4,
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFavCartButtonContainer: {
    padding: 4,
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
