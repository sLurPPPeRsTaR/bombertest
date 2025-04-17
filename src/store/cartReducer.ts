import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface ICart {
  id: number;
  sku: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  minimumOrderQuantity: number;
}

export interface IInitialCartState {
  cart: ICart[];
}

const initialState: IInitialCartState = {
  cart: [],
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQty: (state, action: PayloadAction<{itemId: number}>) => {
      const isItemExistOnCart = state.cart.find(
        item => item.id === action.payload.itemId,
      );
      if (isItemExistOnCart) {
        isItemExistOnCart.qty += 1;
      }
    },

    decrementQty: (state, action: PayloadAction<{itemId: number}>) => {
      const isItemExistOnCart = state.cart.find(
        item => item.id === action.payload.itemId,
      );
      if (isItemExistOnCart) {
        if (isItemExistOnCart.minimumOrderQuantity >= isItemExistOnCart.qty) {
          state.cart = state.cart.filter(
            item => item.id !== action.payload.itemId,
          );
        } else {
          isItemExistOnCart.qty -= 1;
        }
      }
    },

    addToCart: (state, action: PayloadAction<ICart>) => {
      const isItemExistOnCart = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (isItemExistOnCart) {
        isItemExistOnCart.qty += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    replaceCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {incrementQty, decrementQty, addToCart, replaceCart} =
  cart.actions;

export default cart.reducer;
