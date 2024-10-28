import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api'; 

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: string;
  date: string;
  status: 'Completed' | 'Pending';
  bids: number;
  image?: string;  
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

// Fetch tasks for logged-in user
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get('/tasks/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.tasks;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
  }
});

interface PostTaskData {
  title: string;
  description: string;
  location: string;
  budget: string;
  date: string;
  image?: string;  
}



export const postTask = createAsyncThunk('tasks/postTask', async (taskData: PostTaskData, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    console.log("Token:", token); 

    if (!taskData.title || !taskData.description || !taskData.location || !taskData.budget || !taskData.date) {
      return thunkAPI.rejectWithValue('All fields are required');
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('title', taskData.title);
    formData.append('description', taskData.description);
    formData.append('location', taskData.location);
    formData.append('budget', taskData.budget);
    formData.append('date', taskData.date);

    // Check if an image file is provided
    if (taskData.image) {
      formData.append('image', taskData.image);  // `taskData.image` should be a File object
    }

    const response = await axios.post('/tasks/tasks', formData, {
    headers: { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'  
  }
});
return response.data.task;  
  } catch (error: any) {
    console.error("Error posting task:", error); // This logs the error for debugging
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to post task');
  }
});

// Search tasks by title
export const searchTasks = createAsyncThunk('tasks/searchTasks', async (query: string, thunkAPI) => {
  try {
    const response = await axios.get(`/tasks/search?query=${query}`);
    return response.data.tasks;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Search failed');
  }
});

// Add a bid to a task
export const addBid = createAsyncThunk('tasks/addBid', async ({ taskId }: { taskId: string }, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('User is not authenticated');
    }

    const response = await axios.post(`/tasks/task/${taskId}/bid`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.task;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add bid');
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
  state.tasks.push(action.payload); // Make sure action.payload is a task object
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
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
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

// Selectors
export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectSearchResults = (state: { tasks: TasksState }) => state.tasks.searchResults;
export const selectLoading = (state: { tasks: TasksState }) => state.tasks.loading;
export const selectError = (state: { tasks: TasksState }) => state.tasks.error;
