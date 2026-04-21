'use client'; // Client Component — usa useParams y useEffect
import { TasksKanban } from '@/features/tasks/components/TasksKanban';
import { useEffect } from 'react';

export default function Tasks() {
  useEffect(() => {
    document.title = `Todas las tareas`;
  }, []);

  return <TasksKanban projectId={'' as string} />;
}
