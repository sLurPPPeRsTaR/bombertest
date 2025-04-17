import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface IPayloadGetProductListByCategory {
  category: string;
}

interface IPayloadGetProductDetail {
  productId: number;
}

interface IPayloadGetProductBySearch {
  name: string;
}

export const getProductCategoryList = createAsyncThunk(
  'getProductCategoryList',
  async () => {
    try {
      const {data} = await axios.get(
        'https://dummyjson.com/products/category-list',
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProductListByCategory = createAsyncThunk(
  'getProductListByCategory',
  async (payload: IPayloadGetProductListByCategory) => {
    const {category} = payload;
    try {
      const {data} = await axios.get(
        `https://dummyjson.com/products/category/${category}`,
      );
      return data.products;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProductDetail = createAsyncThunk(
  'getProductDetail',
  async (payload: IPayloadGetProductDetail) => {
    const {productId} = payload;
    try {
      const {data} = await axios.get(
        `https://dummyjson.com/products/${productId}`,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProductBySearch = createAsyncThunk(
  'getProductBySearch',
  async (payload: IPayloadGetProductBySearch) => {
    const {name} = payload;
    try {
      const {data} = await axios.get(
        `https://dummyjson.com/products/search?q=${name}`,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
