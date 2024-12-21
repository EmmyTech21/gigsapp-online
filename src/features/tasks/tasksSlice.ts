import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'https://gigsapp-backend.vercel.app/api';

// Define the Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Live'; // Include 'Live' if necessary
  bids: number;
  image?: string;
}

// Define the initial state structure
interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  searchResults: Task[];
}

// Initialize the state
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  searchResults: [],
};

// Fetch tasks for logged-in user
export const fetchTasks = createAsyncThunk<Task[], string | undefined, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/tasks/tasks`, {
         
        headers: { Authorization: `Bearer ${token}` },
       
        params: { userId } // Use userId in the query
      });
       console.log(response.data.tasks)
      return response.data.tasks;
      
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch tasks");
    }
  }
);

// Post a new task
export const postTask = createAsyncThunk<Task, FormData, { rejectValue: string }>(
  'tasks/postTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User is not authenticated');

      const response = await axios.post('/tasks/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to post task');
    }
  }
);

// Search for tasks
export const searchTasks = createAsyncThunk<Task[], string, { rejectValue: string }>(
  'tasks/searchTasks',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/tasks/search`, { params: { query } });
      return response.data.tasks;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

// Add a bid to a task
export const addBid = createAsyncThunk<Task, { taskId: string }, { rejectValue: string }>(
  'tasks/addBid',
  async ({ taskId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('User is not authenticated');

      const response = await axios.post(`/task/${taskId}/bid`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add bid');
    }
  }
);

// Create the tasks slice
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to fetch tasks';
      })
      .addCase(postTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(postTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to post task';
      })
      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload ?? 'Search failed';
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBid.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      })
      .addCase(addBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to add bid';
      });
  },
});

// Export the reducer
export default tasksSlice.reducer;

// Selectors

export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectSearchResults = (state: { tasks: TasksState }) => state.tasks.searchResults;
export const selectLoading = (state: { tasks: TasksState }) => state.tasks.loading;
export const selectError = (state: { tasks: TasksState }) => state.tasks.error;
