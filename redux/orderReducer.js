import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [] },
  reducers: {
    toggleOrder: (state, action) => {
      const orderIndex = state.orders.findIndex(item => item === action.payload);
      if (orderIndex >= 0) {
        // Item exists in cart
        state.orders = state.orders.filter(item => item !== action.payload);
      } else {
        // Add new item to cart
        state.orders.push(action.payload);
      }
    },
    resetOrder: (state) => {
        state.orders = [];
    }
  },
});

// Export actions for use within components
export const { toggleOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;