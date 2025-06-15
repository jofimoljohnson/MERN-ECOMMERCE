import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};
const BASE_URL=import.meta.env.VITE_BASE_URL
console.log("BASEURL",BASE_URL)


export const registerUser = createAsyncThunk(
    "/auth/register",

    async (formData) => {
      // console.log("authslice",formData)
        const response = await 
        axios.post(`${BASE_URL}/api/auth/register`, {
            userName:formData.userName,
            email:formData.email,
            password:formData.password
        }, {
            withCredentials: true,
        });

        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    "/auth/login",

    async (formData) => {
      // console.log("authslice",formData)
        const response = await 
        axios.post(`${BASE_URL}/api/auth/login`, {
            email:formData.email,
            password:formData.password
        }, {
            withCredentials: true,
        });

        return response.data;
    }
);


export const logoutUser=createAsyncThunk(
    "/auth/logout",
    async()=>{
        const response = await 
        axios.post(`${BASE_URL}/api/auth/logout`, {},
            {
            withCredentials: true,
        });

        return response.data;
    }
)








export const checkAuth = createAsyncThunk(
    "/auth/checkauth",

    async () => {
        const response = await 
        axios.get(`${BASE_URL}/api/auth/check-auth`, {
            withCredentials:true,
            headers:{
                "Cache-control" :'no-store,no-cache,must-revalidate,proxy-revalidate',
                
            }
            
        }, {
            withCredentials: true,
        });

        return response.data;
    }
);





const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state,action) => {
                console.log("ACTION",action)
                state.isLoading = false;
                state.user = action.payload.success?action.payload.user:null
                state.isAuthenticated = action.payload.success
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state,action) => {
                console.log("ACTION",action)
                state.isLoading = false;
                state.user = action.payload.success?action.payload.user:null
                state.isAuthenticated = action.payload.success
            })
            .addCase(checkAuth.rejected, (state,action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            }).addCase(logoutUser.fulfilled, (state,action) => {
                state.isLoading = false;
                state.user = null
                state.isAuthenticated = false
            })
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
