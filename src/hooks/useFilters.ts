import { useMemo, useContext } from 'react';
import { FiltersContext } from '@/context';
import { Task } from '@/features/tasks/types';

export function useFilters(tasks: Task[]) {
  const context = useContext(FiltersContext);
  if (!context) throw new Error('useFilters must be used within a FiltersProvider');
  const { filters, setFilters, clearFilters } = context;

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }
    if (filters.assignee) {
      filtered = filtered.filter((task) => task.assignee === filters.assignee);
    }
    return filtered;
  }, [tasks, filters]);

  return { filteredTasks, filters, setFilters, clearFilters };
}
