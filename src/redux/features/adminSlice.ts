/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  users: User[];
  filteredUsers: User[];
  searchQuery: string;
}

const initialState: AdminState = {
  users: [],
  loading: false,
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin")!)
    : null,
  error: null,
  filteredUsers: [],
  searchQuery: "",
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

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(
    "http://localhost:3000/admin/dashboard/user",
    { withCredentials: true }
  );
  return response.data;
});


export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const userId = formData.get("id"); // Get the ID from the FormData
      const response = await axios.put(
        `http://localhost:3000/admin/update/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data; // Assuming your backend returns the updated user data
    } catch (error: any) {
      console.error("Error updating user:", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
);


export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete/${userId}`, {
        withCredentials: true,
      });
      return userId; // Return the user ID so we can remove it from the store
    } catch (error: any) {
      console.error("Error deleting user:", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
);


export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      console.log("Reaching here");
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      console.log(state.filteredUsers);
    },

    clearSearch: (state) => {
      state.searchQuery = "";
      state.filteredUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    builder
      //admin login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload as string);
        state.error = action.payload as string;
      })

      //fetching user
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })

      // Updating user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
          console.log(action.payload); // Update the user with the response data
          state.filteredUsers[index] = action.payload; // Update the filtered users as well
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      })

      //deleting user

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.filteredUsers = state.filteredUsers.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { adminLogout, setSearchQuery, clearSearch } = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminUsers = (state: RootState) => state.admin.users;
export const selectSearchQuery = (state: RootState) => state.admin.searchQuery;
