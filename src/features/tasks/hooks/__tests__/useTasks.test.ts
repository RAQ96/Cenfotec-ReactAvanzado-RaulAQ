import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../useTasks';
import type { Task } from '../../types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Tarea 1',
    priority: 'Alta',
    assignee: 'Juan',
    status: 'Backlog',
    label: '',
    projectId: '1',
  },
  {
    id: '2',
    title: 'Tarea 2',
    priority: 'Media',
    assignee: 'Ana',
    status: 'En progreso',
    label: '',
    projectId: '1',
  },
];

describe('useTasks', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it('should initialize with initial tasks', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[0].title).toBe('Tarea 1');
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.addTask({
        id: '3',
        title: 'Tarea 3',
        priority: 'Baja',
        assignee: 'Luis',
        status: 'Backlog',
        label: '',
        projectId: '1',
      });
    });
    expect(result.current.tasks).toHaveLength(3);
    expect(result.current.tasks[2].title).toBe('Tarea 3');
  });

  it('should update a task', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.updateTask({ ...initialTasks[0], title: 'Tarea 1 editada' });
    });
    expect(result.current.tasks[0].title).toBe('Tarea 1 editada');
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.deleteTask('1');
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('2');
  });

  it('should set tasks', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.setTasks([
        {
          id: '10',
          title: 'Otra',
          priority: 'Alta',
          assignee: 'X',
          status: 'Backlog',
          label: '',
          projectId: '2',
        },
      ]);
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('10');
  });
});
