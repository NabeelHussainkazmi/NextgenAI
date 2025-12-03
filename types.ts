export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  estimatedHours: number;
}

export interface GeneratedTaskResponse {
  tasks: Array<{
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    estimatedHours: number;
    description: string;
  }>;
}

export type ViewState = 'landing' | 'dashboard';
export type DashboardView = 'overview' | 'tasks' | 'settings';
