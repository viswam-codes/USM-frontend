/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
}

interface AdminState {
  loading: boolean;
  admin: User | null;
  error: string | null;
}

const initialState: AdminState = {
  loading: false,
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin")!)
    : null,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    console.log(credentials);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        credentials,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error during login:", error); // Debugging line

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
);

export const adminSlice = createSlice ({
    name:"admin",
    initialState,
    reducers:{
      adminLogout:(state)=>{
        state.admin=null;
        localStorage.removeItem("admin");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload.admin;
            console.log("action:",action.payload)
            localStorage.setItem("admin", JSON.stringify(action.payload.admin));
            localStorage.setItem("adminToken", action.payload.adminAccessToken);
            if(state.admin?.role){
              localStorage.setItem("adminRole", action.payload.admin?.role);
            }
          })
          .addCase(loginAdmin.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload as string);
            state.error = action.payload as string;
          })

    }
})

export const {adminLogout} = adminSlice.actions;

export default adminSlice.reducer;

