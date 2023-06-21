import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // Item exists in cart
        state.items[itemIndex].quantity += 1;
      } else {
        // Add new item to cart
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decrement: (state, action) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (itemIndex >= 0) {
            // Item exists in cart
            if (state.items[itemIndex].quantity == 1) {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            } else {
                state.items[itemIndex].quantity -= 1;
            }
        }
    },
    remove: (state, action) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (itemIndex >= 0) {
            // Item exists in cart
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    },
    deleteCart: (state) => {
        state.items = [];
    }
  },
});

// Export actions for use within components
export const { addToCart, decrement, deleteCart, remove } = cartSlice.actions;

export default cartSlice.reducer;
