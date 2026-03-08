import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

import { createAsyncMessage } from "./messageSlice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0,
    final_total: 0,
  },
  //actions
  reducers: {
    updateCart(state, action) {
      console.log("action", action.payload);
      state.carts = action.payload.carts || [];
      state.total = action.payload.total || 0;
      state.final_total = action.payload.final_total || 0;
    },
  },
});

export const createAsyncGetCart = createAsyncThunk(
  "cart/createAsyncGetCart",
  async (_, { dispatch }) => {
    try {
      const res = await axios.get(
        `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart`,
      );
      console.log(res.data.data);
      dispatch(updateCart(res.data.data));
      //   return res.data.data;
    } catch (error) {
      dispatch(
        createAsyncMessage({
          message: error.response?.data?.message || "取得購物車失敗",
          success: false,
        }),
      );
      throw error;
    }
  },
);

export const createAsyncAddCart = createAsyncThunk(
  "cart/createAsyncAddCart",
  async ({ id, qty }, { dispatch }) => {
    const data = {
      product_id: id,
      qty: qty,
    };
    try {
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart`;
      const res = await axios.post(url, { data });

      console.log(res.data);

      dispatch(createAsyncGetCart());
    } catch (error) {
      console.log(error.response);
    } finally {
    }
  },
);

export const createAsyncDeleteCart = createAsyncThunk(
  "cart/createAsyncDeleteCart",
  async (id, { dispatch }) => {
    try {
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart/${id}`;
      const res = await axios.delete(url);

      console.log(res.data);

      dispatch(createAsyncGetCart());
    } catch (error) {
      console.log(error.response);
    } finally {
    }
  },
);

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
