'use client'; // Client Component — usa useParams
import { TasksKanban } from '@/features/tasks/components/TasksKanban';
import { useParams } from 'next/navigation';

export default function ProjectTasks() {
  const { projectId } = useParams();

  return <TasksKanban projectId={projectId as string} />;
}
