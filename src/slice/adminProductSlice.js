import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useMessage from "../hooks/useMessage";
const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

import { createAsyncMessage } from "./messageSlice";
import { createAsynLoading } from "./isLoadingSlice";

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    pagination: {
      total_pages: 0,
      current_page: 0,
      has_pre: false,
      has_next: false,
      category: "",
    },
  },

  reducers: {
    updateAdminProudct(state, action) {
      console.log("action", action.payload);

      state.products = action.payload.products || [];
      state.pagination = { ...state.pagination, ...action.payload.pagination };
      console.log("state.products ", state.products);
    },
  },
});

export const createAsyncGetAdminProduct = createAsyncThunk(
  "adminProduct/createAsyncGetAllAdminProduct",
  async (page = 1, { dispatch }) => {
    try {
      dispatch(createAsynLoading(true));
      const res = await axios.get(
        `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/admin/products?page=${page}`,
      );
      dispatch(createAsynLoading(false));
      console.log("createAsyncGetAdminProduct", res.data);
      dispatch(updateAdminProudct(res.data));
    } catch (error) {
      dispatch(
        createAsyncMessage({
          message: error.response?.data?.message || "取得產品失敗",
          success: false,
        }),
      );
      throw error;
    } finally {
    }
  },
);

export const createAsyncUpdateAdminProductData = createAsyncThunk(
  "adminProduct/createAsyncUpdateAdminProductData",

  async ({ productData, modalType, id }, { dispatch }) => {
    try {
      let product;
      if (modalType === "edit") {
        product = `product/${id}`;
      } else {
        product = `product`;
      }

      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/admin/${product}`;
      console.log(url);
      let res;
      if (modalType === "edit") {
        res = await axios.put(url, productData);
      } else {
        res = await axios.post(url, productData);
      }
      console.log(res.data.message);
      //   showSuccess(res.data.message);
      dispatch(createAsyncGetAdminProduct());
    } catch (error) {
      if (modalType === "edit") {
        showSuccess(`更新失敗!`);
      } else {
        showSuccess(`新增失敗! `);
      }
      throw error;
    } finally {
      console.log("finally");
    }
  },
);

export const { updateAdminProudct } = adminProductSlice.actions;
export default adminProductSlice.reducer;
