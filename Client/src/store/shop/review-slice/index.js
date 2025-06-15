import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: [],
};

export const addNewReview = createAsyncThunk("/order/addNewReview", async (formData) => {
    const result = await axios.post(`http://localhost:5000/api/shop/review/add`, formData);
    return result?.data;
});

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
    const result = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
    return result?.data;
});

const reviewProductsSlice = createSlice({
    name: "reviewProductsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })

            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            });
    },
});

export default reviewProductsSlice.reducer;
