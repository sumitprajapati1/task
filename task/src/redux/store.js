import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';


const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
});

export default store;