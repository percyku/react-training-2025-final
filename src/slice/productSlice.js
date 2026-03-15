import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAsyncMessage } from "./messageSlice";
import axios from "axios";
const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    categories: [],
    pagination: {
      total_pages: 0,
      current_page: 0,
      has_pre: false,
      has_next: false,
      category: "",
    },
    isLoading: false,
  },
  reducers: {
    updateProduct(state, action) {
      state.product = action.payload || {};
    },
    updateProducts(state, action) {
      state.products = action.payload.products || [];
      state.pagination = action.payload.pagination || {
        total_pages: 0,
        current_page: 0,
        has_pre: false,
        has_next: false,
        category: "",
      };
      state.isLoading = false;
    },
    updateCategories(state, action) {
      state.categories = action.payload || [];
    },
    updateLoading(state, action) {
      state.isLoading = action.payload || false;
    },
  },
});

export const createAsyncGetAllProducts = createAsyncThunk(
  "product/createAsyncGetAllProducts",
  async (_, { dispatch }) => {
    try {
      dispatch(updateLoading(true));
      const res = await axios.get(
        `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products/all`,
      );
      const result = [
        "all",
        ...new Set(res.data.products.map((item) => item.category)),
      ];
      dispatch(updateCategories(result));
    } catch (error) {
      dispatch(
        createAsyncMessage({
          message: error.response?.data?.message || "取得商品失敗",
          success: false,
        }),
      );
      throw error;
    } finally {
      dispatch(updateLoading(false));
    }
  },
);

export const createAsyncGetProducts = createAsyncThunk(
  "product/createAsyncGetProducts",
  async ({ page, category }, { dispatch }) => {
    try {
      dispatch(updateLoading(true));
      const res = await axios.get(
        `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products`,
        {
          params: {
            page,
            category: category === "all" ? null : category,
          },
        },
      );
      dispatch(updateProducts(res.data));
    } catch (error) {
      dispatch(
        createAsyncMessage({
          message: error.response?.data?.message || "取得商品失敗",
          success: false,
        }),
      );
      throw error;
    } finally {
      dispatch(updateLoading(false));
    }
  },
);

export const createAsyncGetProduct = createAsyncThunk(
  "product/createAsyncGetProduct",
  async (id, { dispatch }) => {
    try {
      dispatch(updateLoading(true));
      const res = await axios.get(
        `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/product/${id}`,
      );
      dispatch(updateProduct(res.data.product));
    } catch (error) {
      dispatch(
        createAsyncMessage({
          message: error.response?.data?.message || "取得商品失敗",
          success: false,
        }),
      );
      throw error;
    } finally {
      dispatch(updateLoading(false));
    }
  },
);

export const {
  updateProduct,
  updateProducts,
  updateCategories,
  updateLoading,
} = productSlice.actions;
export default productSlice.reducer;
