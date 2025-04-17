import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface IFavoriteItem {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: {
    rating?: number;
    comment?: string;
    date?: string;
    reviewerName?: string;
    reviewerEmail?: string;
  }[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt?: string;
    updatedAt?: string;
    barcode?: string;
    qrCode?: string;
  };
  images?: string[];
  thumbnail?: string;
}

interface IFavoriteInitialState {
  favorite: IFavoriteItem[];
}

const initialState: IFavoriteInitialState = {
  favorite: [],
};

export const favorite = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IFavoriteItem>) => {
      state.favorite.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<IFavoriteItem>) => {
      state.favorite = state.favorite.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
});

export const {addFavorite, removeFavorite} = favorite.actions;

export default favorite.reducer;
