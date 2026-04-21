'use client'; // Client Component — usa useTasks
import { ProjectCardView } from './ProjectCardView';
import { useTasks } from '@/features/tasks';
import { Project } from '@/features/projects/types';

type Props = {
  project: Project;
  onNavigate: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const ProjectCardContainer = ({ project, onNavigate, onDelete }: Props) => {
  const { tasks } = useTasks();
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const completedTasks = projectTasks.filter((t) => t.status === 'Completado').length;
  const totalTasks = projectTasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const taskLabel = `${completedTasks} / ${totalTasks} tareas`;

  const handleViewDetail = () => {
    onNavigate(project.id);
  };

  return (
    <ProjectCardView
      name={project.name}
      detail={project.detail}
      progress={progress}
      taskLabel={taskLabel}
      onViewDetail={handleViewDetail}
      onDelete={onDelete ? () => onDelete(project.id) : undefined}
    />
  );
};
