/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface UserState {
  loading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: UserState = {
    loading: false,
    user: localStorage.getItem("user") 
      ? JSON.parse(localStorage.getItem("user")!) 
      : null,
    token: null,
    error: null,
  };

export const registerUser = createAsyncThunk(
  "http://localhost:3000/register",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      console.log("reaching");
      const response = await axios.post(
        "http://localhost:3000/register",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("Error5555", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "http://localhost:3000/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    console.log(credentials);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials,
        {withCredentials:true},
        
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout:(state)=>{
        state.user=null;
        state.token=null;

        localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder

      //Registering
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token; 
        
        localStorage.setItem("user", JSON.stringify(action.payload.user));// Store user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload as string);
        state.error = action.payload as string;
      });
  },
});


export const { logout } = userSlice.actions;
//exporting the reducer to adding it to the store
export default userSlice.reducer;
