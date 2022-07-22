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
import { questReducer } from "./features/questSlice";
import { authApi } from "./services/auth";
import { placeFilterReducer } from "./features/placeFilter";
import { placesApi } from "./services/places";
import { questsApi } from "./services/quests";

const rootReducers = combineReducers({
    placeFilterReducer,
    authReducer,
    questReducer,
    [authApi.reducerPath]: authApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
    [questsApi.reducerPath]: questsApi.reducer,
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware, placesApi.middleware, questsApi.middleware),

});

export const persistor = persistStore(store);

