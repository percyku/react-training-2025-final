import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slice/messageSlice";
import cartReducer from "../slice/cartSlice";
import adminProductreducer from "../slice/adminProductSlice";
import loadingReducer from "../slice/isLoadingSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart: cartReducer,
    adminProduct: adminProductreducer,
    isLoading: loadingReducer,
  },
});

export default store;
