export interface Task {
  id: number;
  title: string;
  category: string;
  budget: number;
  status: string;
}

export interface DashboardState {
  tasksCompleted: number;
  activeTasks: number;
  pendingRequests: number;
  helperRating: number;
  tasks: Task[];
}
