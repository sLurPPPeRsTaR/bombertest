import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import Padder from '../component/Padder';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Button from '../component/Button';
import {decrementQty, incrementQty, replaceCart} from '../store/cartReducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigatorParamList} from '../navigation/AppNavigator';

interface ITempLocalCart {
  id: number;
  title: string;
  price: number;
  qty: number;
  sku: string;
  image: string;
}

const Cart: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<AppNavigatorParamList>>();

  const {cart} = useSelector((state: RootState) => state.cart);

  const [tempLocalCart, setTempLocalCart] = useState<ITempLocalCart[]>([]);

  const totalPrice = useMemo(() => {
    return tempLocalCart?.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);
  }, [tempLocalCart]);

  const getCheckoutButtonStyle = {
    backgroundColor: totalPrice === 0 ? 'gray' : 'skyblue',
  };

  return (
    <View style={styles.f1}>
      <FlatList
        data={cart}
        keyExtractor={item => item?.id.toString()}
        renderItem={props => {
          const {item} = props;
          return (
            <Padder style={styles.padderCOntainer}>
              <BouncyCheckbox
                isChecked={tempLocalCart?.some(i => i?.id === item.id)}
                disableText
                fillColor="black"
                size={25}
                useBuiltInState={false}
                iconImageStyle={styles.iconImageStyle}
                onPress={() => {
                  setTempLocalCart(prevState => {
                    if (prevState.some(i => i.id === item.id)) {
                      return prevState.filter(i => i.id !== item.id);
                    }

                    return [...prevState, item];
                  });
                }}
              />
              <View>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.imageContainer}
                />
              </View>
              <View style={styles.f1}>
                <Text numberOfLines={1}>{item.title}</Text>
                <Text>Total price : ${item.price * item.qty}</Text>
                <Text>SKU : {item.sku}</Text>
                <View style={styles.circleButtonIncrementDecrementContainer}>
                  <Button
                    style={styles.circleButtonIncrementDecrement}
                    onPress={() => {
                      dispatch(decrementQty({itemId: item.id}));

                      const isItemExistOnLocalCart = tempLocalCart.find(
                        i => i.id === item.id,
                      );

                      if (isItemExistOnLocalCart) {
                        setTempLocalCart(prevState => {
                          return prevState.map(i =>
                            i.id === item.id ? {...i, qty: i.qty - 1} : i,
                          );
                        });
                      }
                    }}>
                    -
                  </Button>
                  <Text>{item.qty}</Text>
                  <Button
                    style={styles.circleButtonIncrementDecrement}
                    onPress={() => {
                      dispatch(incrementQty({itemId: item.id}));

                      const isItemExistOnLocalCart = tempLocalCart.find(
                        i => i.id === item.id,
                      );

                      if (isItemExistOnLocalCart) {
                        setTempLocalCart(prevState => {
                          return prevState.map(i =>
                            i.id === item.id ? {...i, qty: i.qty + 1} : i,
                          );
                        });
                      }
                    }}>
                    +
                  </Button>
                </View>
              </View>
            </Padder>
          );
        }}
      />
      <Padder style={styles.pB24}>
        <Button
          disabled={totalPrice === 0}
          style={[
            styles.listFooterComponentButtonContainer,
            getCheckoutButtonStyle,
          ]}
          onPress={() => {
            Alert.alert(
              'Confirm Checkout',
              `Are you sure you want to checkout with a total of $${totalPrice}?`,
              [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {
                  text: 'OK',
                  onPress: () => {
                    const filteredCart = cart.filter(
                      item => !tempLocalCart.map(i => i.id).includes(item.id),
                    );
                    dispatch(replaceCart(filteredCart));
                    setTempLocalCart([]);
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: true},
            );
          }}>
          Checkout Subtotal {totalPrice !== 0 ? `$${totalPrice}` : ''}
        </Button>
      </Padder>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  circleButtonIncrementDecrementContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  circleButtonIncrementDecrement: {
    backgroundColor: 'orange',
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padderCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  imageContainer: {width: 100, height: 100},
  f1: {flex: 1},
  listFooterComponentButtonContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pB24: {paddingBottom: 24},
});
