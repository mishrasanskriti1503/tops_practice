export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: 'WORK' | 'PERSONAL' | 'EDUCATION' | 'OTHER';
  createdAt: string;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  highPriority: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Initiate Warp Core Sync',
    description: 'Establish stable quantum resonance across primary antimatter injectors and align energy output with secondary conduits.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: 'WORK',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'task-2',
    title: 'Calibrate Stellar Navigation',
    description: 'Perform laser telemetry checks on the long-range navigational array targeting the Andromeda Sector coordinates.',
    status: 'TODO',
    priority: 'MEDIUM',
    category: 'EDUCATION',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
  },
  {
    id: 'task-3',
    title: 'Harvest Helium-3 Drones',
    description: 'Analyze telemetry logs from the autonomous collection drones returning from the Saturn sub-orbit mine.',
    status: 'DONE',
    priority: 'LOW',
    category: 'WORK',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'task-4',
    title: 'Thermal Shielding Coating',
    description: 'Apply ultra-dense graphene shielding alloy to the forward command module to minimize atmospheric re-entry abrasion.',
    status: 'TODO',
    priority: 'HIGH',
    category: 'PERSONAL',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
  }
];

// Helper to make database persist during HMR (Hot Module Replacement)
interface GlobalDB {
  tasks?: Task[];
}

const globalDB = globalThis as unknown as GlobalDB;

if (!globalDB.tasks) {
  globalDB.tasks = [...INITIAL_TASKS];
}

export const db = {
  getTasks: (): Task[] => {
    return globalDB.tasks || [];
  },

  addTask: (input: { title: string; description: string; priority: string; category: string }): Task => {
    const newTask: Task = {
      id: `task-${Math.random().toString(36).substring(2, 9)}`,
      title: input.title,
      description: input.description,
      status: 'TODO',
      priority: (input.priority as any) || 'MEDIUM',
      category: (input.category as any) || 'WORK',
      createdAt: new Date().toISOString(),
    };
    globalDB.tasks = [newTask, ...(globalDB.tasks || [])];
    return newTask;
  },

  updateTaskStatus: (id: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE'): Task | null => {
    const tasks = globalDB.tasks || [];
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return null;
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status
    };
    
    globalDB.tasks = [...tasks];
    return tasks[taskIndex];
  },

  deleteTask: (id: string): boolean => {
    const tasks = globalDB.tasks || [];
    const initialLength = tasks.length;
    globalDB.tasks = tasks.filter(t => t.id !== id);
    return globalDB.tasks.length < initialLength;
  },

  getStats: (): TaskStats => {
    const tasks = globalDB.tasks || [];
    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'TODO').length,
      inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      done: tasks.filter(t => t.status === 'DONE').length,
      highPriority: tasks.filter(t => t.priority === 'HIGH').length,
    };
  }
};
