import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import cartReducer from './cartReducer';
import chatReducer from './chatReducer';
import orderReducer from './orderReducer';
import cateringReducer from './cateringReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    chat: chatReducer,
    order: orderReducer,
    catering: cateringReducer
  }
});

export default store;