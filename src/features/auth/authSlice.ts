// Import necessary modules
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define interfaces for Task and User
interface Task {
  id: string;
  title: string;
  category: string;
  budget: number;
  status?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string; // Added phoneNumber to User interface
  tasks?: Task[];
}

// Define AuthState interface
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Fetch user profile
export const fetchUser = createAsyncThunk<User, void, { state: { auth: AuthState } }>(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().auth;
    const token = state.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.get('http://localhost:3000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      return response.data; 
    } catch (error) {
      console.error("Fetch user error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Server error");
    }
  }
);

// Signup thunk
export const signup = createAsyncThunk<{ user: User; token: string }, any>(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Login thunk
export const login = createAsyncThunk<{ user: User; token: string }, any>(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      const userData = response.data; // Assuming the response contains user and token

      // Fetch user profile after login
      await thunkAPI.dispatch(fetchUser());
      
      return userData; // Return userData to update the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;

// Selector
export const selectAuth = (state: RootState) => state.auth;
