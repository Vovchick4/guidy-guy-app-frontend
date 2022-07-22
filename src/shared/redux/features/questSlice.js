import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState = {
    placesQuest: []
}
const questSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        clearState: () => initialState,
        setPlacesQuest: (state, { payload }) => {
            state.placesQuest = payload;
        },
        updatePlaceQuest: (state, { payload }) => {
            return state.placesQuest.map(pl => pl?.id === payload?.id ? payload : pl)
        }
    }
})

export const { clearState, setPlacesQuest, updatePlaceQuest } = questSlice.actions
export const getPlacesQuest = (state) => state.questReducer.placesQuest
export const questReducer = persistReducer({
    key: 'rtk:quest',
    storage
}, questSlice.reducer);