import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: [],
    productDetails: null,
};
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        });

        const result = await axios.get(`${BASE_URL}/api/shop/products/get?${query}`);
        return result?.data;
    }
);

export const fetchProductDetails = createAsyncThunk("/products/fetchProductDetails", async (id) => {
    const result = await axios.get(`${BASE_URL}/api/shop/products/get/${id}`)
    return result?.data;
});

const ShoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails:(state)=>{
            state.productDetails=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsList = action.payload.data;
            })

            .addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false;
                state.productsList = [];
            }).addCase(fetchProductDetails.pending,(state)=>{
                state.isLoading = true;


            }).addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action?.payload?.data;
            })
            .addCase(fetchProductDetails.rejected,(state)=>{
                state.isLoading = false;
                state.productsList = null
                
            })
    },
});
export const { setProductDetails } = ShoppingProductsSlice.actions;

export default ShoppingProductsSlice.reducer;
