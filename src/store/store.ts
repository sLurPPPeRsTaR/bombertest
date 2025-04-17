import {configureStore} from '@reduxjs/toolkit';
import productSlice from './productReducer';
import cartSlice from './cartReducer';
import favoriteSlice from './favoriteReducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfigCard = {
  key: 'cart',
  storage: AsyncStorage,
};

const persistConfigFavorite = {
  key: 'favorite',
  storage: AsyncStorage,
};

const persistedCartReducer = persistReducer(persistConfigCard, cartSlice);
const persistedFavoriteReducer = persistReducer(
  persistConfigFavorite,
  favoriteSlice,
);

export const store = configureStore({
  reducer: {
    product: productSlice,
    cart: persistedCartReducer,
    favorite: persistedFavoriteReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
