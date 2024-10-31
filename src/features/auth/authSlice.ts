import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { RootState, AppDispatch } from '../../app/store';
// import { ThunkDispatch } from 'redux-thunk';

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
  phoneNumber?: string;
  tasks?: Task[];
}

// Define AuthState interface
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | { message: string } | null;
}

// Initial state
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Custom hook for dispatch with correct type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Fetch user profile
export const fetchUser = createAsyncThunk<User, void, { state: RootState; rejectValue: string }>(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.get('https://gigsapp-backend.vercel.app/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Server error");
    }
  }
);

// Signup thunk
export const signup = createAsyncThunk<{ user: User; token: string }, Record<string, any>, { rejectValue: string }>(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('https://gigsapp-backend.vercel.app/api/auth/register', formData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Signup error");
    }
  }
);

// Login thunk
export const login = createAsyncThunk<{ user: User; token: string }, Record<string, any>, { rejectValue: string }>(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('https://gigsapp-backend.vercel.app/api/auth/login', formData);
      const userData = response.data;

      await thunkAPI.dispatch(fetchUser() as any); // Type assertion to avoid type mismatch
      return userData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login error");
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
        state.error = action.payload || "Signup failed";
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
        state.error = action.payload || "Login failed";
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
        state.error = action.payload || "Failed to fetch user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


// Export actions and reducer
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

// Selector for auth state
export const selectAuth = (state: RootState) => state.auth;
