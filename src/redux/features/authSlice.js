import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState = {
    user: {},
    token: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, { payload }) => {
            state.user = payload;
        }
    },
})

export const { logout, setUser } = authSlice.actions
export const authReducer = persistReducer({
    key: 'rtk:auth',
    storage,
    whitelist: ['token']
}, authSlice.reducer);