import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export default authReducer.reducer;
export const { login, logout } = authReducer.actions;