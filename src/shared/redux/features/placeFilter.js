import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 0,
    search: ""
}
const placeFilterSlice = createSlice({
    name: 'placeFilter',
    initialState,
    reducers: {
        init: () => initialState,
        setPage: (state, { payload }) => {
            state.page = payload;
        },
        setSearch: (state, { payload }) => {
            state.search = payload;
        }
    }
})

export const { init, setPage, setSearch } = placeFilterSlice.actions
export const getPlaceFiltersSelector = (state) => state.placeFilterReducer
export const placeFilterReducer = placeFilterSlice.reducer