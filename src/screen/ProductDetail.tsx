import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, Fragment, useLayoutEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../navigation/AppNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import Empty from '../component/Empty';
import {getProductDetail} from '../store/productAction';
import {clearProductDetail} from '../store/productReducer';
import Padder from '../component/Padder';
import moment from 'moment';
import Button from '../component/Button';
import {addToCart} from '../store/cartReducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {addFavorite, IFavoriteItem} from '../store/favoriteReducer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<AppNavigatorParamList, 'ProductDetail'>;

const ProductDetail: FC<Props> = props => {
  const {itemId} = props.route.params;

  const {isLoading, productDetail} = useSelector(
    (state: RootState) => state.product,
  );
  const {favorite} = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<AppNavigatorParamList>>();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isAlreadyFavorite = useMemo(() => {
    return favorite.some(item => item.id === productDetail?.id);
  }, [favorite, productDetail?.id]);

  useLayoutEffect(() => {
    if (itemId) {
      dispatch(getProductDetail({productId: itemId}));
    }
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, itemId]);

  if (isLoading) {
    return <Empty />;
  }

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <Fragment>
      <View style={styles.flatlistDotContainer}>
        <View>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            data={productDetail?.images || []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    height: screenHeight / 3,
                    width: screenWidth,
                  }}>
                  <Image
                    source={{uri: item}}
                    style={styles.imageContainer}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
          <View style={styles.pagination}>
            {(productDetail?.images || []).length > 1 &&
              (productDetail?.images || []).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeIndex === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
          </View>
          {!isAlreadyFavorite && (
            <Button
              onPress={() => {
                dispatch(addFavorite(productDetail as IFavoriteItem));
              }}
              style={styles.favButtonContainer}>
              Add Favorite
            </Button>
          )}
        </View>
      </View>
      <Padder style={styles.padderContainer}>
        <View style={styles.ratingStockContainer}>
          <Text>Rating : {productDetail?.rating}</Text>
        </View>
        <View style={styles.ratingStockContainer}>
          <Text>{productDetail?.title}</Text>
          <Text>Brand : {productDetail?.brand}</Text>
        </View>
        <Text style={styles.minimumOrderContainer}>
          Minimum order Qty : {productDetail?.minimumOrderQuantity}
        </Text>
        <Text>{productDetail?.description}</Text>
        <Text>Warranty : {productDetail?.warrantyInformation}</Text>
        <Text style={styles.titleHeader}>Review :</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={productDetail?.reviews || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewerName}>{item.reviewerName}</Text>
              <Text style={styles.rating}>Rating: {item.rating} ⭐</Text>
              <Text style={styles.comment}>"{item.comment}"</Text>
              <Text style={styles.date}>
                {moment(item.date).format('YYYY-MM-DD HH:mm')}
              </Text>
            </View>
          )}
        />
        <Button
          onPress={() => {
            dispatch(
              addToCart({
                id: productDetail?.id ?? 0,
                sku: productDetail?.sku ?? '',
                title: productDetail?.title ?? '',
                price: productDetail?.price ?? 0,
                qty: productDetail?.minimumOrderQuantity ?? 1,
                minimumOrderQuantity: productDetail?.minimumOrderQuantity ?? 1,
                image: productDetail?.thumbnail ?? '',
              }),
            );
            Alert.alert('Success', 'Product added to cart', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          }}
          style={styles.addToCartButtonContainer}>
          Add to Cart
        </Button>
      </Padder>
    </Fragment>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  imageContainer: {width: '100%', height: '100%'},
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'red',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewContainer: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 16,
  },
  flatlistDotContainer: {height: '40%', position: 'relative'},
  padderContainer: {height: '60%', gap: 8},
  ratingStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCartButtonContainer: {
    borderRadius: 8,
    height: 48,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  minimumOrderContainer: {color: 'red', fontWeight: 'bold', fontSize: 16},
  favButtonContainer: {
    backgroundColor: 'pink',
    position: 'absolute',
    top: '4%',
    right: '4%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
});
