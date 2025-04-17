import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Product from '../screen/product/Product';
import Cart from '../screen/Cart';
import ProductDetail from '../screen/ProductDetail';
import Favorite from '../screen/Favorite';

export type AppNavigatorParamList = {
  Product: undefined;
  ProductDetail: {itemId: number};
  Favorite: {isFavorite: boolean};
  Cart: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
