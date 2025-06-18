import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: [],
};
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSearchResults = createAsyncThunk("/order/getSearchResults", async (keyword) => {
    const result = await axios.get(`${BASE_URL}/api/shop/search/${keyword}`);
    return result?.data;
});

const searchProductsSlice = createSlice({
    name: "searchProductsSlice",
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })

            .addCase(getSearchResults.rejected, (state) => {
                state.isLoading = false;
                state.searchResults = [];
            });
    },
});
export const { resetSearchResults } = searchProductsSlice.actions;

export default searchProductsSlice.reducer;
