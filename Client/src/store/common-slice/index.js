import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: [],
};
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getFeatureImages = createAsyncThunk("/feature/getFeatureImages", async () => {
    const response = await axios.get(`${BASE_URL}/api/common/feature/get`);
    return response.data;
});

export const addFeatureImages = createAsyncThunk("/feature/addFeatureImages", async (image) => {
    const response = await axios.post(`${BASE_URL}/api/common/feature/add`, { image });
    return response.data;
});

const commonFeatureSlice = createSlice({
    name: "ShoppingAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = [];
            });
    },
});

export default commonFeatureSlice.reducer;
