import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  location: string;
  budget: string;
  date: string;
  status: 'Completed' | 'Pending';
  bids: number;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  searchResults: Task[];
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  searchResults: [],
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId: string, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/tasks/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.tasks;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data || 'Something went wrong');
  }
});

export const postTask = createAsyncThunk('tasks/postTask', async (taskData: Task, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/tasks', taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.task;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data || 'Failed to post task');
  }
});

export const searchTasks = createAsyncThunk('tasks/searchTasks', async (query: string, thunkAPI) => {
  try {
    const response = await axios.get(`/api/tasks/search?query=${query}`);
    return response.data.tasks;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data || 'Search failed');
  }
});

export const addBid = createAsyncThunk('tasks/addBid', async ({ taskId, userId }: { taskId: number; userId: string }, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`/api/task/${taskId}/bid`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.task;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data || 'Failed to add bid');
  }
});

const tasksSlice = createSlice({
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
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
        // Update the task with the new bid count
        const updatedTask = action.payload;
        state.tasks = state.tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      })
      .addCase(addBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;

export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectSearchResults = (state: { tasks: TasksState }) => state.tasks.searchResults;
