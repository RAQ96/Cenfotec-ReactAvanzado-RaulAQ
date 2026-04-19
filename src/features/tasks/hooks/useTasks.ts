import { useReducer, useEffect } from 'react';
import tasksData from '@/data/initialTasksData.json';
import { Task } from '@/features/tasks/types';

// Tipos de acciones
export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] };

function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.payload);
    case 'SET_TASKS':
      return action.payload;
    default:
      return state;
  }
}

export function useTasks(initial?: Task[]) {
  const getInitialTasks = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tasks');
      if (stored) return JSON.parse(stored) as Task[];
    }
    return initial ?? (tasksData as Task[]);
  };

  const [tasks, dispatch] = useReducer(tasksReducer, undefined, getInitialTasks);

  // Persistir en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Acciones helpers
  const addTask = (task: Task) => dispatch({ type: 'ADD_TASK', payload: task });
  const updateTask = (task: Task) => dispatch({ type: 'UPDATE_TASK', payload: task });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });
  const setTasks = (tasks: Task[]) => dispatch({ type: 'SET_TASKS', payload: tasks });

  return { tasks, addTask, updateTask, deleteTask, setTasks };
}
