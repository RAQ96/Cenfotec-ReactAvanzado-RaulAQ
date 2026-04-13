type Project = {
  id: string
  name: string
  detail: string
  completedTasks: number
  totalTasks: number
}

type Props = {
  project: Project
  onNavigate: (id: string) => void
}

import { ProjectCardView } from './ProjectCardView'

export const ProjectCardContainer = ({ project, onNavigate }: Props) => {
  const progress =
    project.totalTasks === 0
      ? 0
      : (project.completedTasks / project.totalTasks) * 100

  const taskLabel = `${project.completedTasks} / ${project.totalTasks} tareas`

  const handleViewDetail = () => {
    onNavigate(project.id)
  }

  return (
    <ProjectCardView
      name={project.name}
      detail={project.detail}
      progress={progress}
      taskLabel={taskLabel}
      onViewDetail={handleViewDetail}
    />
  )
}