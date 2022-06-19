import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import { authReducer } from "./features/authSlice";
import { authApi } from "./services/auth";
import { placesApi } from "./services/places";

const rootReducers = combineReducers({
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware, placesApi.middleware),

});

export const persistor = persistStore(store);

