'use client';

import React, { useState, useEffect } from 'react';
import { useGraphQLQuery, useGraphQLMutation } from '@/hooks/useGraphQL';

// Types matched to GraphQL Schema
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: 'WORK' | 'PERSONAL' | 'EDUCATION' | 'OTHER';
  createdAt: string;
}

interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  highPriority: number;
}

// GraphQL Documents
const GET_TASKS_QUERY = `
  query GetTasks($status: TaskStatus) {
    getTasks(status: $status) {
      id
      title
      description
      status
      priority
      category
      createdAt
    }
  }
`;

const GET_STATS_QUERY = `
  query GetStats {
    getStats {
      total
      todo
      inProgress
      done
      highPriority
    }
  }
`;

const ADD_TASK_MUTATION = `
  mutation AddTask($title: String!, $description: String!, $priority: TaskPriority!, $category: TaskCategory!) {
    addTask(title: $title, description: $description, priority: $priority, category: $category) {
      id
      title
      description
      status
      priority
      category
      createdAt
    }
  }
`;

const UPDATE_STATUS_MUTATION = `
  mutation UpdateTaskStatus($id: ID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const DELETE_TASK_MUTATION = `
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'WORK' | 'PERSONAL' | 'EDUCATION' | 'OTHER'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPriority, setFormPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [formCategory, setFormCategory] = useState<'WORK' | 'PERSONAL' | 'EDUCATION' | 'OTHER'>('WORK');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // GraphQL hooks
  const tasksQuery = useGraphQLQuery<{ getTasks: Task[] }>(GET_TASKS_QUERY);
  const statsQuery = useGraphQLQuery<{ getStats: TaskStats }>(GET_STATS_QUERY);
  const addTaskMutation = useGraphQLMutation<{ addTask: Task }>(ADD_TASK_MUTATION);
  const updateStatusMutation = useGraphQLMutation<{ updateTaskStatus: Task }>(UPDATE_STATUS_MUTATION);
  const deleteTaskMutation = useGraphQLMutation<{ deleteTask: boolean }>(DELETE_TASK_MUTATION);

  // Fetch all tasks and statistics
  const refetchData = async () => {
    try {
      await Promise.all([
        tasksQuery.execute(),
        statsQuery.execute()
      ]);
    } catch (err) {
      console.error("Failed to load GraphQL data:", err);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDesc.trim()) return;

    setFormSubmitting(true);
    try {
      await addTaskMutation.execute({
        title: formTitle,
        description: formDesc,
        priority: formPriority,
        category: formCategory
      });
      
      // Reset Form and Modal
      setFormTitle('');
      setFormDesc('');
      setFormPriority('MEDIUM');
      setFormCategory('WORK');
      setIsModalOpen(false);
      
      // Refresh Data
      refetchData();
    } catch (err) {
      alert("Error adding task: " + (err as Error).message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: 'TODO' | 'IN_PROGRESS' | 'DONE', direction: 'forward' | 'backward') => {
    let newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE' = 'TODO';
    
    if (direction === 'forward') {
      if (currentStatus === 'TODO') newStatus = 'IN_PROGRESS';
      if (currentStatus === 'IN_PROGRESS') newStatus = 'DONE';
    } else {
      if (currentStatus === 'DONE') newStatus = 'IN_PROGRESS';
      if (currentStatus === 'IN_PROGRESS') newStatus = 'TODO';
    }

    try {
      // Optimistic Update
      if (tasksQuery.data) {
        const updatedList = tasksQuery.data.getTasks.map(t => 
          t.id === id ? { ...t, status: newStatus } : t
        );
        tasksQuery.setData({ getTasks: updatedList });
      }

      await updateStatusMutation.execute({ id, status: newStatus });
      refetchData();
    } catch (err) {
      alert("Error updating status: " + (err as Error).message);
      refetchData(); // Revert on failure
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to abort this task mission?")) return;

    try {
      // Optimistic Update
      if (tasksQuery.data) {
        const updatedList = tasksQuery.data.getTasks.filter(t => t.id !== id);
        tasksQuery.setData({ getTasks: updatedList });
      }

      await deleteTaskMutation.execute({ id });
      refetchData();
    } catch (err) {
      alert("Error deleting task: " + (err as Error).message);
      refetchData(); // Revert on failure
    }
  };

  // Filter Tasks locally by category if needed
  const tasks = tasksQuery.data?.getTasks || [];
  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'ALL') return true;
    return t.category === activeFilter;
  });

  const stats = statsQuery.data?.getStats || {
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    highPriority: 0
  };

  const todoTasks = filteredTasks.filter(t => t.status === 'TODO');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'IN_PROGRESS');
  const doneTasks = filteredTasks.filter(t => t.status === 'DONE');

  const isLoading = tasksQuery.loading && !tasksQuery.data;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <h1 className="logo-title">
            <span>AETHER</span>
            <span style={{ fontWeight: 300, color: 'var(--color-secondary)' }}>//</span>
            <span style={{ color: 'var(--color-primary)' }}>GraphQL</span>
          </h1>
          <p className="logo-subtitle">Quantum Mission Planner</p>
        </div>
        <div className="action-banner">
          <a 
            href="/api/graphql" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            title="Explore schema & run custom queries in the Apollo GraphQL Sandbox"
          >
            <span>GraphQL Sandbox</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Deploy Task</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Missions</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-icon">🛰️</div>
        </div>
        <div className="stat-card cyan">
          <div className="stat-info">
            <span className="stat-label">Active / In Orbit</span>
            <span className="stat-value">{stats.inProgress}</span>
          </div>
          <div className="stat-icon" style={{ color: 'var(--color-secondary)' }}>⚡</div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Landed / Complete</span>
            <span className="stat-value">{stats.done}</span>
          </div>
          <div className="stat-icon" style={{ color: 'var(--status-done)' }}>✅</div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Critical Warning</span>
            <span className="stat-value">{stats.highPriority}</span>
          </div>
          <div className="stat-icon" style={{ color: 'var(--priority-high)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>🚨</div>
        </div>
      </section>

      {/* Filtering Controls */}
      <section className="filter-bar">
        <div className="filter-group">
          {(['ALL', 'WORK', 'PERSONAL', 'EDUCATION', 'OTHER'] as const).map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--foreground-dark)' }}>
          GraphQL Endpoint: <span style={{ fontFamily: 'monospace', color: '#c084fc' }}>/api/graphql</span>
        </div>
      </section>

      {/* Main Board columns */}
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Syncing with Quantum Server...</span>
        </div>
      ) : (
        <section className="board-columns">
          {/* TODO COLUMN */}
          <div className="board-column todo-col">
            <div className="column-header">
              <h3 className="column-title">
                <span>🌑</span>
                <span>Backlog / Todo</span>
              </h3>
              <span className="column-badge">{todoTasks.length}</span>
            </div>
            
            <div className="column-tasks">
              {todoTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🕳️</div>
                  <div className="empty-text">No pending tasks. Backlog is clear.</div>
                </div>
              ) : (
                todoTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask}
                    onMove={handleUpdateStatus}
                  />
                ))
              )}
            </div>
          </div>

          {/* IN PROGRESS COLUMN */}
          <div className="board-column inprogress-col">
            <div className="column-header">
              <h3 className="column-title">
                <span>🛰️</span>
                <span>In Mission</span>
              </h3>
              <span className="column-badge">{inProgressTasks.length}</span>
            </div>

            <div className="column-tasks">
              {inProgressTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🌀</div>
                  <div className="empty-text">No active processes. Set a task into orbit.</div>
                </div>
              ) : (
                inProgressTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask}
                    onMove={handleUpdateStatus}
                  />
                ))
              )}
            </div>
          </div>

          {/* DONE COLUMN */}
          <div className="board-column done-col">
            <div className="column-header">
              <h3 className="column-title">
                <span>⭐</span>
                <span>Mission Accomplished</span>
              </h3>
              <span className="column-badge">{doneTasks.length}</span>
            </div>

            <div className="column-tasks">
              {doneTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🌌</div>
                  <div className="empty-text">No completed missions yet. Make history.</div>
                </div>
              ) : (
                doneTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask}
                    onMove={handleUpdateStatus}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Task Creation Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Deploy New Task</h3>
              <button className="action-icon-btn" onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.2rem' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="task-title-input">Task Title</label>
                <input 
                  type="text" 
                  id="task-title-input"
                  className="form-input" 
                  placeholder="e.g. Recalibrate fusion reflectors" 
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  required
                  disabled={formSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="task-desc-input">Mission Description</label>
                <textarea 
                  id="task-desc-input"
                  className="form-textarea" 
                  placeholder="Provide precise orbital parameters or steps..." 
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  required
                  disabled={formSubmitting}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="task-priority-input">Priority</label>
                  <select 
                    id="task-priority-input"
                    className="form-select"
                    value={formPriority}
                    onChange={e => setFormPriority(e.target.value as any)}
                    disabled={formSubmitting}
                  >
                    <option value="LOW">Low (Routine)</option>
                    <option value="MEDIUM">Medium (Optimal)</option>
                    <option value="HIGH">High (Critical)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="task-cat-input">Category</label>
                  <select 
                    id="task-cat-input"
                    className="form-select"
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    disabled={formSubmitting}
                  >
                    <option value="WORK">Work / Main</option>
                    <option value="PERSONAL">Personal / Cabin</option>
                    <option value="EDUCATION">Education / Lab</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={formSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? 'Deploying...' : 'Launch Mission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, currentStatus: 'TODO' | 'IN_PROGRESS' | 'DONE', direction: 'forward' | 'backward') => void;
}

function TaskCard({ task, onDelete, onMove }: TaskCardProps) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-actions">
          <button 
            className="action-icon-btn delete" 
            onClick={() => onDelete(task.id)}
            title="Abort / Delete task"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>

      <p className="task-desc">{task.description}</p>

      <div className="task-meta">
        <div className="task-badges">
          <span className="badge badge-priority">{task.priority}</span>
          <span className="badge badge-cat">{task.category}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {task.status !== 'TODO' && (
            <button 
              className="action-icon-btn" 
              onClick={() => onMove(task.id, task.status, 'backward')}
              title="Move backward"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          
          <span className="task-date">{formattedDate}</span>

          {task.status !== 'DONE' && (
            <button 
              className="action-icon-btn" 
              onClick={() => onMove(task.id, task.status, 'forward')}
              title="Move forward"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
