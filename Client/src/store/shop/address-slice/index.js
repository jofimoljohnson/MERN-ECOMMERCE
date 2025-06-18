import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: [],
};
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const addNewAddress = createAsyncThunk("/address/addNewAddress", async (formData) => {
    const response = await axios.post(`${BASE_URL}/api/shop/address/add`, formData);
    return response.data;
});

export const fetchAllAddress = createAsyncThunk("/address/fetchAllAddress", async (userId) => {
    const response = await axios.get(`${BASE_URL}/api/shop/address/get/${userId}`);
    return response.data;
});

export const editAddress = createAsyncThunk("/address/editAddress", async ({ userId, addressId, formData }) => {
    const response = await axios.put(`${BASE_URL}/api/shop/address/update/${userId}/${addressId}`, formData);
    return response.data;
});

export const deleteAddress = createAsyncThunk("/address/deleteAddress", async ({ userId, addressId }) => {
    const response = await axios.delete(`${BASE_URL}/api/shop/address/delete/${userId}/${addressId}`);
    return response.data;
});

const ShoppingAddressSlice = createSlice({
    name: "ShoppingAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewAddress.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchAllAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAllAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(editAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(editAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            });
    },
});

export default ShoppingAddressSlice.reducer;
