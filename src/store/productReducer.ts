import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  getProductCategoryList,
  getProductListByCategory,
  getProductDetail,
  getProductBySearch,
} from './productAction';

interface IReview {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface IProductDetail {
  id: number;
  sku: string;
  price: number;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
  rating: number;
  title: string;
  brand: string;
  description: string;
  warrantyInformation: string;
  reviews: IReview[];
}

interface IProductBySearch {
  products: string[];
}

interface IInitialProductState {
  productCategoryList: string[];
  productListByCategory: string[];
  productDetail: IProductDetail | null;
  productBySearch: IProductBySearch | null;
  isLoading: boolean;
}

const initialState: IInitialProductState = {
  productCategoryList: [],
  productListByCategory: [],
  productDetail: null,
  productBySearch: null,
  isLoading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductDetail: state => {
      state.productDetail = null;
    },
    clearProductBySearch: state => {
      state.productBySearch = null;
    },
  },
  extraReducers: builder => {
    /**
     * productCategoryList
     */
    builder.addCase(getProductCategoryList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productCategoryList = action.payload;
    });

    builder.addCase(getProductCategoryList.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getProductCategoryList.rejected, (state, _) => {
      state.isLoading = false;
      state.productCategoryList = [];
    });

    /**
     * productListByCategory
     */
    builder.addCase(getProductListByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productListByCategory = action.payload;
    });

    builder.addCase(getProductListByCategory.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getProductListByCategory.rejected, (state, _) => {
      state.isLoading = false;
      state.productListByCategory = [];
    });

    /**
     * productDetail
     */
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetail = action.payload;
    });

    builder.addCase(getProductDetail.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getProductDetail.rejected, (state, _) => {
      state.isLoading = false;
      state.productDetail = null;
    });

    /**
     * productBySearch
     */
    builder.addCase(getProductBySearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productBySearch = action.payload;
    });

    builder.addCase(getProductBySearch.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getProductBySearch.rejected, (state, _) => {
      state.isLoading = false;
      state.productBySearch = null;
    });
  },
});

export const {clearProductDetail, clearProductBySearch} = productSlice.actions;

export default productSlice.reducer;
