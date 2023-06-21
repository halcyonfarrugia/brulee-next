import { createSlice } from '@reduxjs/toolkit';

export const cateringSlice = createSlice({
  name: 'catering',
  initialState: { requests: [] },
  reducers: {
    toggleRequest: (state, action) => {
      const requestIndex = state.requests.findIndex(item => item === action.payload);
      if (requestIndex >= 0) {
        // Item exists in cart
        state.requests = state.requests.filter(item => item !== action.payload);
      } else {
        // Add new item to cart
        state.requests.push(action.payload);
      }
    },
    resetRequests: (state) => {
        state.requests = [];
    }
  },
});

// Export actions for use within components
export const { toggleRequest, resetRequests } = cateringSlice.actions;

export default cateringSlice.reducer;