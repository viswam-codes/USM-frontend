/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

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
  users:any[];
}

const initialState: AdminState = {
  users:[],
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

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async()=>{
    const response = await axios.get('http://localhost:3000/admin/dashboard/user',{withCredentials:true});
    return response.data
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
          .addCase(fetchUsers.pending, (state) => {
            state.loading = true;  
            state.error = null;    
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;  
            state.users = action.payload; 
            console.log(action.payload)
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;  
            state.error = action.error.message || 'Failed to fetch users';  
          });

    }
})

export const {adminLogout} = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminUsers = (state: RootState) => state.admin.users;

