import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  user: {
    name: string;
    tasksCompleted: number;
    activeTasks: number;
    pendingRequests: number;
    ratings: number;
  };
  tasks: Array<{
    id: number;
    title: string;
    category: string;
    budget: string;
    status: 'Pending' | 'Completed';
  }>;
}

const initialState: DashboardState = {
  user: {
    name: 'Abdullahi Al-Mansur',
    tasksCompleted: 134,
    activeTasks: 12,
    pendingRequests: 18,
    ratings: 4,
  },
  tasks: [
    { id: 1, title: 'Get cooking materials', category: 'Errands', budget: 'NGN 15,500', status: 'Completed' },
    { id: 2, title: 'Paint front porch', category: 'Painting', budget: 'NGN 15,500', status: 'Pending' },
    { id: 3, title: 'Deliver goods', category: 'Delivery', budget: 'NGN 15,500', status: 'Completed' },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
