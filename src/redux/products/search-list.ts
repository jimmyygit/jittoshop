import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Product } from "../../components/product-card";
import { setError } from "../../utils/error";
import publicAxios from "../../utils/public-axios";
import data from "../../../public/pro.json";

export interface ProductSliceState {
  products: Product[];
  loading: boolean;
  error: null | object;
  pages: number;
  page: number;
  categories: string[];
  brands: string[];
  total: number;
}

const products: Product[] | [] = [];

const initialState: ProductSliceState = {
  products: products,
  loading: false,
  error: null,
  categories: [],
  brands: [],
  page: 1,
  pages: 1,
  total: 1,
};

export const getFilterProducts = createAsyncThunk(
  "products/filter",
  async (u: any) => {
    try {
      const { data } = await publicAxios.get(
        `/products/search?page=${u.n}&brand=${u.b}&category=${u.c}&query=${u.q}`
      );
      return data;
    } catch (error: any) {
      const message = setError(error);
      toast.error(message);
    }
  }
);

export const productFilterSlice = createSlice({
  name: "products-filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilterProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFilterProducts.fulfilled, (state, action) => {
      // console.log(JSON.stringify(action.payload.productDocs));
      state.loading = false;
      // state.products = action.payload.productDocs;
      state.products = JSON.parse(JSON.stringify(data));
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.brands = action.payload.brands;
      state.categories = ["Processed", "Packaged", "Bulk"];
      state.total = action.payload.countProducts;
    });
    builder.addCase(getFilterProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productFilterSlice;
