'use client'; // Client Component — usa useParams y useEffect
import { useEffect } from 'react';
import { TasksKanban } from '@/features/tasks/components/TasksKanban';
import { useParams } from 'next/navigation';
import { useProjectsStore } from '@/store/projects';

export default function ProjectTasks() {
  const { projectId } = useParams();
  const project = useProjectsStore((state) => state.projects.find((p) => p.id === projectId));

  useEffect(() => {
    document.title = `Proyecto ${project?.name || 'Proyecto'}`;
  }, [projectId, project]);

  return <TasksKanban projectId={projectId as string} />;
}
