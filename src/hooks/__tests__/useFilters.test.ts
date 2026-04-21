import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from '@/hooks';
import { Task } from '@/features/tasks/types';
import { FiltersProvider } from '@/context/FiltersContext';

describe('useFilters', () => {
  it('filters by priority and assignee', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'A',
        priority: 'Alta',
        assignee: 'Juan',
        status: 'Backlog',
        projectId: '',
        label: '',
      },
      {
        id: '2',
        title: 'B',
        priority: 'Baja',
        assignee: 'Ana',
        status: 'Backlog',
        projectId: '',
        label: '',
      },
    ];
    const { result } = renderHook(() => useFilters(tasks), {
      wrapper: FiltersProvider,
    });
    act(() => {
      result.current.setFilters({ priority: 'Alta', assignee: null });
    });
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].id).toBe('1');
  });
});
