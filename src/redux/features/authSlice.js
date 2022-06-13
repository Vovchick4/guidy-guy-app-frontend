import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

import { authApi } from "../services/auth";

const initialState = {
    user: {},
    token: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
            console.log(action);
        })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
                state.token = payload.token
                state.token = payload.user
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                console.log(action);
            })
    }
})


export const { logout } = authSlice.actions
export const authReducer = persistReducer({
    key: 'rtk:auth',
    storage,
    whitelist: ['token']
}, authSlice.reducer);